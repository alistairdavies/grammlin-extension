export class UnprocessableResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnprocessableResponseError";
  }
}

export class UnexpectedResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedResponseError";
  }
}
