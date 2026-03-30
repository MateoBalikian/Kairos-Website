import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mzgmfqpvecolhniqxoty.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

/**
 * Retorna a URL pública de um arquivo no bucket de mídia.
 * @param {string} path - Caminho do arquivo dentro do bucket (ex: 'trocker/demo.mp4')
 */
export function mediaUrl(path) {
  return `${SUPABASE_URL}/storage/v1/object/public/kairos-midia/${path}`
}
