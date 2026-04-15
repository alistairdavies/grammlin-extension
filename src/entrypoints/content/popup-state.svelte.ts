import type { Token } from "@/lib/api/types";

export type PopupState =
  | { state: "loading" }
  | { state: "tokens"; tokens: Token[] }
  | { state: "error"; errorType: "invalid" | "unexpected" }
  | { state: "hidden" };

export class PopupStore {
  current = $state<PopupState>({ state: "hidden" });
  top = $state(0);
  left = $state(0);
  get isVisible() {
    return this.current.state !== "hidden";
  }

  showLoading(x: number, y: number) {
    this.left = x;
    this.top = y;
    this.current = { state: "loading" };
  }

  hide() {
    this.current = { state: "hidden" };
  }

  setTokens(tokens: Token[]) {
    this.current = { state: "tokens", tokens };
  }

  setError(errorType: "invalid" | "unexpected") {
    this.current = { state: "error", errorType };
  }
}
