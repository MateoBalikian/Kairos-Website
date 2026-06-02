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
