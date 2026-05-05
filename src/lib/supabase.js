import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mzgmfqpvecolhniqxoty.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Retorna a URL pública de um arquivo no bucket de mídia.
 * @param {string} path - Caminho do arquivo dentro do bucket (ex: 'trocker/demo.mp4')
 */
export function mediaUrl(path) {
  return `${SUPABASE_URL}/storage/v1/object/public/kairos-midia/${path}`
}

export async function saveLead(data) {
  const { nome, email, telefone, pagina, campo_extra, campo_extra_label } = data
  const { error } = await supabase
    .from('leads')
    .insert([{ nome, email, telefone, pagina, campo_extra, campo_extra_label }])
  return { error }
}
