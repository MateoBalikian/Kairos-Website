import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mzgmfqpvecolhniqxoty.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Z21mcXB2ZWNvbGhuaXF4b3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTI4NzUsImV4cCI6MjA1ODkyODg3NX0.bfF0RCSqe6BP0laLSzIDo9fHFbSJ4S7-jrp-3vUWL0k'

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
