import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json();
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag is required' },
        { status: 400 }
      );
    }

    // Revalidate the specified tag
    revalidateTag(tag);

    return NextResponse.json(
      { success: true, message: `Cache revalidated for tag: ${tag}` },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to revalidate cache' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Cache API endpoint is working' },
    { status: 200 }
  );
}