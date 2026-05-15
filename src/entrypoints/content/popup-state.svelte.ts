import type { Token } from "@/lib/api/types";

export type PopupPosition =
  | { direction: "below"; top: number; left: number }
  | { direction: "above"; bottom: number; left: number };

export type VisiblePopupState =
  | { state: "loading"; position: PopupPosition }
  | { state: "loaded"; tokens: Token[]; position: PopupPosition }
  | {
      state: "error";
      errorType: "invalid" | "unexpected";
      position: PopupPosition;
    };

export type PopupState = VisiblePopupState | { state: "hidden" };

export class PopupStore {
  current = $state<PopupState>({ state: "hidden" });
  private position: PopupPosition = { direction: "below", top: 0, left: 0 };

  get isVisible() {
    return this.current.state !== "hidden";
  }

  showLoading(position: PopupPosition) {
    this.position = position;
    this.current = { state: "loading", position: this.position };
  }

  hide() {
    this.current = { state: "hidden" };
  }

  setTokens(tokens: Token[]) {
    this.current = {
      state: "loaded",
      tokens,
      position: this.position,
    };
  }

  setError(errorType: "invalid" | "unexpected") {
    this.current = {
      state: "error",
      errorType,
      position: this.position,
    };
  }
}
