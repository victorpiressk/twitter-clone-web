import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface NormalizedError {
  message: string
  fields: Record<string, string>
}

/**
 * Interface para o formato padrão do Django Rest Framework
 */
interface DjangoErrorData {
  detail?: string
  message?: string
  [key: string]: string | string[] | undefined
}

/**
 * Transforma erros da API (RTK Query) em formato normalizado
 * Aceita unknown para evitar type assertions nos componentes
 */
export const transformApiError = (error: unknown): NormalizedError => {
  const normalized: NormalizedError = {
    message: 'Ocorreu um erro inesperado.',
    fields: {}
  }

  // Validação básica
  if (!error || typeof error !== 'object') {
    return normalized
  }

  // Trata FetchBaseQueryError
  if ('status' in error) {
    const fetchError = error as FetchBaseQueryError
    const data = fetchError.data as DjangoErrorData

    if (data && typeof data === 'object') {
      // 1. Mapeia todos os erros de campos
      Object.entries(data).forEach(([field, value]) => {
        if (field !== 'detail' && field !== 'message') {
          if (Array.isArray(value) && value.length > 0) {
            normalized.fields[field] = value[0]
          } else if (typeof value === 'string') {
            normalized.fields[field] = value
          }
        }
      })

      // 2. Define a mensagem do Toast com a seguinte prioridade:
      // 1º: Erro global (detail)
      // 2º: Mensagem customizada (message)
      // 3º: O primeiro erro de campo encontrado
      // 4º: Mensagem baseada no status HTTP
      // 5º: Mensagem genérica
      if (data.detail) {
        normalized.message = data.detail
      } else if (data.message) {
        normalized.message = data.message
      } else {
        const fieldErrors = Object.values(normalized.fields)
        if (fieldErrors.length > 0) {
          normalized.message = fieldErrors[0]
        } else {
          // Mensagens específicas por status HTTP
          switch (fetchError.status) {
            case 400:
              normalized.message = 'Verifique os campos preenchidos.'
              break
            case 401:
              normalized.message = 'Credenciais inválidas.'
              break
            case 403:
              normalized.message = 'Acesso negado.'
              break
            case 404:
              normalized.message = 'Recurso não encontrado.'
              break
            case 500:
              normalized.message =
                'Erro no servidor. Tente novamente mais tarde.'
              break
            case 'FETCH_ERROR':
              normalized.message = 'Erro de conexão. Verifique sua internet.'
              break
            case 'PARSING_ERROR':
              normalized.message = 'Erro ao processar resposta do servidor.'
              break
            case 'TIMEOUT_ERROR':
              normalized.message =
                'Tempo de resposta esgotado. Tente novamente.'
              break
            default:
              normalized.message = 'Verifique os campos preenchidos.'
          }
        }
      }
    }
  }
  // Trata SerializedError
  else if ('message' in error) {
    const serializedError = error as SerializedError
    normalized.message =
      serializedError.message || 'Ocorreu um erro inesperado.'
  }

  return normalized
}
