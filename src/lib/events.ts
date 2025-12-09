import type { Token } from '@/lib/api/types';

export type ExtensionEvent =
  | { action: "analyseSentence"; text: string }
  | { action: "displayAnalysedSentence"; text: string; tokens: Token[] }
  | { action: "displayAnalyseError"; errorType: "invalid" | "unexpected" };
