import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Use browser entry points in package.json files during tests
    conditions: process.env.VITEST ? ["browser"] : undefined,
  },
});
