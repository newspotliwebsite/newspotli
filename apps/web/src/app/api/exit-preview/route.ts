import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function GET() {
  draftMode().disable()
  redirect('/')
}
