import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug')
  const secret = url.searchParams.get('secret')

  const expected = process.env.SANITY_REVALIDATE_SECRET
  // Without this check an unset env var would make `undefined === undefined`
  // pass and open draft mode to anyone.
  if (!expected) {
    return new Response('Preview is not configured', { status: 500 })
  }

  if (secret !== expected) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!slug) {
    return new Response('Slug required', { status: 400 })
  }

  draftMode().enable()
  // Encoding keeps a slug like "//evil.com" from redirecting off-site.
  redirect(`/article/${encodeURIComponent(slug)}`)
}
