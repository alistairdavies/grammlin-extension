import type { Token } from "@/lib/api/types";

export type VisiblePopupState =
  | { state: "loading"; position: { top: number; left: number } }
  | {
      state: "loaded";
      tokens: Token[];
      position: { top: number; left: number };
    }
  | {
      state: "error";
      errorType: "invalid" | "unexpected";
      position: { top: number; left: number };
    };

export type PopupState = VisiblePopupState | { state: "hidden" };

export class PopupStore {
  current = $state<PopupState>({ state: "hidden" });
  top = 0;
  left = 0;
  get isVisible() {
    return this.current.state !== "hidden";
  }

  showLoading(x: number, y: number) {
    this.left = x;
    this.top = y;
    this.current = {
      state: "loading",
      position: { top: this.top, left: this.left },
    };
  }

  hide() {
    this.current = { state: "hidden" };
  }

  setTokens(tokens: Token[]) {
    this.current = {
      state: "loaded",
      tokens,
      position: { top: this.top, left: this.left },
    };
  }

  setError(errorType: "invalid" | "unexpected") {
    this.current = {
      state: "error",
      errorType,
      position: { top: this.top, left: this.left },
    };
  }
}
