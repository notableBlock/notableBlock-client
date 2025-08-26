import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const clientUrlObj = new URL(clientUrl);
const clientHost = clientUrlObj.hostname;
const clientPort = clientUrlObj.port;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: "html",

  use: {
    baseURL: clientUrl,
    headless: !!process.env.CI,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--disable-blink-features=AutomationControlled", "--disable-popup-blocking"],
        },
      },
    },
  ],
  webServer: process.env.CI
    ? {
        command: `vite preview --host ${clientHost} --port ${clientPort}`,
        url: clientUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: "ignore",
        stderr: "pipe",
      }
    : undefined,
});
