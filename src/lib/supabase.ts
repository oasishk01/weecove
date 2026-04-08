import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _browser: SupabaseClient | null = null
let _server: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_browser) return _browser
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase env vars not configured')
  _browser = createClient(url, key)
  return _browser
}

export function createServerClient(): SupabaseClient {
  if (_server) return _server
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase server env vars not configured')
  _server = createClient(url, key)
  return _server
}
