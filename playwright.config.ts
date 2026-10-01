import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	use: {
		baseURL: "http://127.0.0.1:5181",
		viewport: { width: 1280, height: 900 },
		trace: "retain-on-failure",
	},
	webServer: {
		command: "bun run dev -- --host 127.0.0.1 --port 5181",
		url: "http://127.0.0.1:5181",
		reuseExistingServer: !process.env.CI,
	},
});
