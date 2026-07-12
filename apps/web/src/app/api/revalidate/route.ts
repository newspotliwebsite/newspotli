import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

function revalidateEverything() {
  // Revalidate all main pages
  revalidatePath('/', 'layout')
  revalidatePath('/', 'page')
  revalidatePath('/about', 'page')
  revalidatePath('/team', 'page')
  revalidatePath('/latest', 'page')
  revalidatePath('/videos', 'page')
  revalidatePath('/article/[slug]', 'page')
  revalidatePath('/category/[slug]', 'page')
  revalidatePath('/author/[slug]', 'page')

  // Revalidate cache tags
  revalidateTag('articles')
  revalidateTag('categories')
  revalidateTag('authors')
}

export async function POST(request: Request) {
  // Check authorization header (set in Sanity webhook HTTP headers)
  const secret = request.headers.get('authorization')

  // Also check query param as fallback
  const url = new URL(request.url)
  const querySecret = url.searchParams.get('secret')

  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  if (secret !== expectedSecret && querySecret !== expectedSecret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    revalidateEverything()

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      revalidated: false,
      error: String(error),
    }, { status: 500 })
  }
}

// Also handle GET for easy testing
export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/', 'layout')
  revalidatePath('/', 'page')
  revalidateTag('articles')

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() })
}
