import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN, // You need to add this to your .env file
  apiVersion: '2024-03-20',
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Create or update site settings
    const result = await client.createOrReplace({
      _type: 'siteSettings',
      _id: 'siteSettings', // Using a fixed ID for singleton document
      ...body
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const settings = await client.fetch('*[_type == "siteSettings"][0]');
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
} 