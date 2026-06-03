// Rótulos legíveis para os valores dos selects dos formulários.
// Usados para montar as mensagens de WhatsApp com texto amigável
// em vez do valor cru do <option> (ex.: "performance").

export const planoLabels = {
  express: 'Avaliação Express — R$250',
  performance: 'Avaliação Performance — R$450',
  reavaliacao: 'Reavaliação / Follow-up — R$290',
  mapa: 'Mapa Fisiometabólico — R$1.850',
  evolution: 'Veltron Evolution — R$3.900',
  'nao-sei': 'Ainda não sei',
}

export const objetivoLabels = {
  'melhorar-performance': 'Melhorar performance',
  'prevenir-lesao': 'Prevenir lesão',
  'acompanhar-evolucao': 'Acompanhar evolução',
  outro: 'Outro',
}

// Converte um valor para seu rótulo legível; cai para o próprio valor
// ou "Não informado" quando vazio.
export const labelFor = (map, value) => map[value] || value || 'Não informado'

// Monta a mensagem de WhatsApp do lead em tom sóbrio e profissional.
// `intro` é a frase de abertura (em 1ª pessoa); `linhas` é uma lista de
// pares [rótulo, valor] — linhas com valor vazio são omitidas; `email`
// vai discreto no rodapé. Usa *negrito* e _itálico_ do WhatsApp.
export function buildLeadMessage({ intro, linhas = [], email }) {
  const corpo = linhas
    .filter(([, valor]) => valor && String(valor).trim())
    .map(([rotulo, valor]) => `*${rotulo}:* ${valor}`)
    .join('\n')
  let msg = `Olá, equipe Veltron.\n\n${intro}`
  if (corpo) msg += `\n\n${corpo}`
  msg += `\n\nFico no aguardo para os próximos passos.`
  if (email) msg += `\n\n_Contato: ${email}_`
  return msg
}
