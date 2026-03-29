#!/usr/bin/env node
/**
 * Bulk-create Sanity `donor` documents from a CSV file.
 *
 * Prereqs in .env.local (repo root):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET (optional, default production)
 *   SANITY_API_WRITE_TOKEN   ← create at sanity.io/manage → API → Tokens (Editor)
 *
 * Usage:
 *   node scripts/import-donors-from-csv.mjs path/to/file.csv
 *   node scripts/import-donors-from-csv.mjs ~/Downloads/kalyanamantapam-donors.csv --dry-run
 *
 * Supported columns (case-insensitive header row):
 *   Donor | name | Name          → name (required)
 *   Amount_INR | amount | Amount → amount (optional)
 *   cause | Cause                → cause slug (default: kalyana-mandapam)
 *   Notes | notes | message      → message
 *   donationDate | Date          → ISO or YYYY-MM-DD (optional; defaults to now)
 *
 * Rows with Serial/title "TOTAL" are skipped.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
dotenv.config({ path: path.join(root, '.env.local') });

const dryRun = process.argv.includes('--dry-run');
const args = process.argv.slice(2).filter((a) => a !== '--dry-run');
const csvPath = args[0]
  ? path.resolve(args[0])
  : path.join(process.env.HOME || '', 'Downloads', 'kalyanamantapam-donors.csv');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
  process.exit(1);
}
if (!dryRun && !token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in .env.local (not needed for --dry-run)');
  process.exit(1);
}

if (!fs.existsSync(csvPath)) {
  console.error('CSV not found:', csvPath);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-20',
  token,
  useCdn: false,
});

const raw = fs.readFileSync(csvPath, 'utf8');
// Rows without a trailing Notes column (or ragged commas) would otherwise throw.
const rows = parse(raw, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  relax_column_count: true,
});

function pick(row, ...keys) {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== '') return row[k];
    const found = Object.keys(row).find((rk) => rk.toLowerCase() === k.toLowerCase());
    if (found && row[found] !== undefined && row[found] !== '') return row[found];
  }
  return undefined;
}

function parseAmount(v) {
  if (v === undefined || v === null || v === '') return undefined;
  const n = parseInt(String(v).replace(/[,₹\s]/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

const toCreate = [];

for (const row of rows) {
  const serial = pick(row, 'Serial', 'serial');
  if (String(serial || '').toLowerCase() === 'total') continue;

  const name = pick(row, 'Donor', 'name', 'Name');
  if (!name || !String(name).trim()) continue;

  const amount = parseAmount(pick(row, 'Amount_INR', 'amount', 'Amount'));
  const message = pick(row, 'Notes', 'notes', 'message', 'Message');
  const cause = (pick(row, 'cause', 'Cause') || 'kalyana-mandapam').trim();
  const dateRaw = pick(row, 'donationDate', 'Date', 'date');
  let donationDate;
  if (dateRaw) {
    const d = new Date(dateRaw);
    donationDate = Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  }

  const doc = {
    _type: 'donor',
    name: String(name).trim(),
    ...(amount !== undefined ? { amount } : {}),
    cause,
    ...(donationDate ? { donationDate } : {}),
    ...(message ? { message: String(message).trim() } : {}),
    isAnonymous: false,
    displayOnWebsite: true,
  };
  toCreate.push(doc);
}

console.log(`Parsed ${toCreate.length} donor rows from ${csvPath}${dryRun ? ' (dry-run)' : ''}`);

if (dryRun) {
  console.log(JSON.stringify(toCreate.slice(0, 3), null, 2));
  if (toCreate.length > 3) console.log(`... and ${toCreate.length - 3} more`);
  process.exit(0);
}

let ok = 0;
for (const doc of toCreate) {
  try {
    await client.create(doc);
    ok++;
    console.log('Created:', doc.name);
  } catch (e) {
    console.error('Failed:', doc.name, e.message);
  }
}

console.log(`Done. Created ${ok}/${toCreate.length} documents.`);
