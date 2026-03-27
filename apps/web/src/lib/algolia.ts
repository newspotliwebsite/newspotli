import { algoliasearch } from 'algoliasearch'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''
const adminKey = process.env.ALGOLIA_ADMIN_KEY || ''

export const ALGOLIA_INDEX = 'articles'

// Lazy-initialized clients to avoid build-time crashes when env vars are missing
let _searchClient: ReturnType<typeof algoliasearch> | null = null
let _adminClient: ReturnType<typeof algoliasearch> | null = null

export function getSearchClient() {
  if (!appId || !searchKey) return null
  if (!_searchClient) _searchClient = algoliasearch(appId, searchKey)
  return _searchClient
}

export function getAdminClient() {
  if (!appId || !adminKey) return null
  if (!_adminClient) _adminClient = algoliasearch(appId, adminKey)
  return _adminClient
}
