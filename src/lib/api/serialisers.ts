import type { components } from './grammar_client'
import type { Definition, MorphologyTag, Token } from './types'

type TokenResponse = components['schemas']['AnalyseResponse']['tokens'][number]

export function serialiseTokens(
  tokens: components['schemas']['AnalyseResponse']['tokens'],
): Token[] {
  return tokens.map(serialiseToken)
}

export function serialiseToken(token: TokenResponse): Token {
  const tags =
    'morphology' in token ? serialiseMorphology(token.morphology) : []
  const definitions = serialiseDefinitions(token.definitions)

  return {
    text: token.text,
    lemma: token.lemma,
    pos: token.part_of_speech,
    definitions,
    tags,
    compound_parts:
      definitions.length === 1
        ? (token.definitions?.[0].compound_parts ?? null)
        : null,
  }
}

export function serialiseMorphology(
  morphology: Record<string, unknown>,
): MorphologyTag[] {
  return Object.values(morphology).filter(
    (value): value is MorphologyTag => typeof value === 'string',
  )
}

export function serialiseDefinitions(
  definitions?: components['schemas']['Definition'][],
): Definition[] {
  return (
    definitions?.map((def) => ({
      translations: def.translations,
      definition: def.definition,
      distinction: def.distinction,
    })) ?? []
  )
}
