import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

export async function GET() {
  try {
    // Test query to verify connection
    const result = await client.fetch(`*[_type == "system.group"][0]`)
    
    return NextResponse.json({
      status: 'success',
      sanityConnection: 'working',
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      result
    })
  } catch (error) {
    console.error('Sanity connection error:', error)
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
    }, { status: 500 })
  }
} 