import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const secret = request.headers.get('authorization')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/')
  revalidatePath('/article/[slug]', 'page')
  revalidatePath('/category/[slug]', 'page')
  revalidateTag('articles')

  return NextResponse.json({ revalidated: true, timestamp: new Date() })
}
