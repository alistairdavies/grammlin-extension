import type { Token } from "@/lib/api/types";

export type ExtensionEvent = { action: "analyseSentence"; text: string };

export type AnalyseResponse =
  | { status: "success"; tokens: Token[] }
  | { status: "error"; errorType: "invalid" | "unexpected" };
