import type { Token } from "@/lib/api/types";

export type ExtensionEvent =
  | { action: "analyseSentence"; text: string }
  | { action: "disableExtension" }
  | { action: "openOptions" };

export type AnalyseResponse =
  | { status: "success"; tokens: Token[] }
  | { status: "error"; errorType: "invalid" | "unexpected" };
