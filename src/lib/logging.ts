type LogLevel = "debug" | "error" | "info" | "warn";
type ExecutionContext = "background" | "content";

const APP_NAME = "grammlin";

const noOp = () => {};

function log(level: LogLevel, context: ExecutionContext, ...args: unknown[]) {
  console[level](`[${APP_NAME}:${context}]`, ...args);
}

export function createLogger(context: ExecutionContext) {
  return {
    debug: (...args: unknown[]) =>
      import.meta.env.PROD ? noOp : log("debug", context, ...args),
    warn: (...args: unknown[]) => log("warn", context, ...args),
    error: (...args: unknown[]) => log("error", context, ...args),
    info: (...args: unknown[]) => log("info", context, ...args),
  };
}
