/**
 * Formata um número para exibição compacta.
 * Ex: 1500 → "1.5K", 1200000 → "1.2M"
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
