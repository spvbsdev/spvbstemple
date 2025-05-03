import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!;
const CHANNEL_ID = 'UCHOB-imU5tUURLQq0Qy7PbQ'; // <-- Updated with your channel ID

export async function GET() {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  return NextResponse.json(data);
} 