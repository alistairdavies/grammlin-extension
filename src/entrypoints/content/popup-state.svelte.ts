import type { Token } from "@/lib/api/types";

export type PopupState =
  | { type: "loading" }
  | { type: "tokens"; tokens: Token[] }
  | { type: "error"; errorType: "invalid" | "unexpected" }
  | { type: "hidden" };

let popupState = $state<PopupState>({ type: "hidden" });
let popupTop = $state(0);
let popupLeft = $state(0);
let activeTokenIndex = $state(0);

export function getPopupState(): PopupState {
  return popupState;
}

export function getPosition(): { top: number; left: number } {
  return { top: popupTop, left: popupLeft };
}

export function getActiveTokenIndex(): number {
  return activeTokenIndex;
}

export function setActiveTokenIndex(index: number) {
  activeTokenIndex = index;
}

export function showLoading(x: number, y: number) {
  popupLeft = x;
  popupTop = y;
  activeTokenIndex = 0;
  popupState = { type: "loading" };
}

export function hidePopup() {
  popupState = { type: "hidden" };
}

export function setTokens(tokens: Token[]) {
  activeTokenIndex = 0;
  popupState = { type: "tokens", tokens };
}

export function setError(errorType: "invalid" | "unexpected") {
  popupState = { type: "error", errorType };
}

export function isVisible(): boolean {
  return popupState.type !== "hidden";
}
