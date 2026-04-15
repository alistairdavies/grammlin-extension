import { afterEach, beforeEach, describe, expect, test, vitest } from "vitest";
import { createLogger } from "./logging";

beforeEach(() => {
  vitest.spyOn(console, "debug");
  vitest.spyOn(console, "info");
});

afterEach(() => {
  vitest.restoreAllMocks();
});

test("logs with a consistent prefix", async () => {
  const logger = createLogger("content");

  logger.debug("debug-log");
  logger.info("info-log");

  expect(console.debug).toHaveBeenCalledExactlyOnceWith(
    "[grammlin:content]",
    "debug-log",
  );
  expect(console.info).toHaveBeenCalledExactlyOnceWith(
    "[grammlin:content]",
    "info-log",
  );
});

test("omits debug logs when the environment is production", async () => {
  const originalEnv = import.meta.env.PROD;
  import.meta.env.PROD = true;

  const logger = createLogger("content");

  logger.debug("debug-log");

  expect(console.debug).not.toHaveBeenCalled();

  import.meta.env.PROD = originalEnv;
});
