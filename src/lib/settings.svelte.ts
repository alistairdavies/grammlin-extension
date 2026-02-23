import type { GrammarLanguage } from "@/lib/i18n/types";

let grammarLanguage = $state<GrammarLanguage>("sv");

export function getGrammarLanguage(): GrammarLanguage {
  return grammarLanguage;
}

export function setGrammarLanguage(lang: GrammarLanguage) {
  grammarLanguage = lang;
}
