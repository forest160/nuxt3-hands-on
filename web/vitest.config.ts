import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig(
  await defineVitestProject({
    test: { environment: "happy-dom" },
  })
);
