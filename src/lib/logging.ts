type LogLevel = "debug" | "error" | "info" | "warn";
type ExecutionContext = "background" | "content";

const APP_NAME = "grammlin";
const IS_PRODUCTION = import.meta.env.PROD;

const noOp = () => {};

function log(level: LogLevel, context: ExecutionContext, ...args: any[]) {
  console[level](`[${APP_NAME}:${context}]`, ...args);
}

export function createLogger(context: ExecutionContext) {
  return {
    debug: (...args: any[]) =>
      IS_PRODUCTION ? noOp : log("debug", context, ...args),
    warn: (...args: any[]) => log("warn", context, ...args),
    error: (...args: any[]) => log("error", context, ...args),
    info: (...args: any[]) => log("info", context, ...args),
  };
}
