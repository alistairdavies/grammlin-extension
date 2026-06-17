import createClient from 'openapi-fetch'
import { UnexpectedResponseError, UnprocessableResponseError } from './errors'
import type { paths } from './grammar_client'
import { serialiseTokens } from './serialisers'
import type { Token } from './types'

export function createService(baseUrl: string) {
  const client = createClient<paths>({
    baseUrl: baseUrl,
  })

  async function parseSentence(sentence: string): Promise<Token[]> {
    const { data, error, response } = await client.POST('/analyse', {
      body: { sentence },
    })

    if (error) {
      if (response.status === 422) {
        throw new UnprocessableResponseError(`Invalid sentence provided.`)
      }

      throw new UnexpectedResponseError(
        `Unexpected ${response.status} response when analysing sentence`,
      )
    }

    return serialiseTokens(data.tokens)
  }

  return { parseSentence }
}
