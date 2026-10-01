import { expect, test } from "@playwright/test";

for (const stacked of [false, true]) {
	test(`drag exit moves right without snapping left (${stacked ? "stack" : "single"})`, async ({
		page,
	}) => {
		await page.goto("/components/toast");
		// Wait for hydration before firing demo actions.
		await page.waitForLoadState("networkidle");
		if (stacked)
			await page.getByRole("button", { name: "Warning", exact: true }).click();
		await page.getByRole("button", { name: "Success", exact: true }).click();
		const toast = page.getByRole("status").filter({ hasText: "Changes saved" });
		await toast.hover();
		await page.waitForTimeout(500);
		const box = await toast.boundingBox();
		if (!box) throw new Error("Toast is not visible");
		await page.mouse.move(box.x + 70, box.y + 40);
		await page.mouse.down();
		await page.mouse.move(box.x + 180, box.y + 40, { steps: 10 });
		// Sample the rendered position every frame, including the end of the exit.
		await toast.evaluate((node) => {
			const frames: { x: number; opacity: number; time: number }[] = [];
			const start = performance.now();
			const sample = () => {
				if (!node.isConnected || performance.now() - start > 600) return;
				frames.push({
					x: node.getBoundingClientRect().x,
					opacity: Number(getComputedStyle(node).opacity),
					time: performance.now() - start,
				});
				requestAnimationFrame(sample);
			};
			Object.assign(window, { toastExitFrames: frames });
			sample();
		});
		await page.mouse.up();
		await expect(toast).toHaveCount(0);
		const frames = await page.evaluate(
			() =>
				(
					window as unknown as {
						toastExitFrames: { x: number; opacity: number; time: number }[];
					}
				).toastExitFrames,
		);
		expect(frames.length).toBeGreaterThan(3);
		const visible = frames.filter((frame) => frame.opacity > 0.01);
		for (let index = 1; index < visible.length; index++) {
			expect(visible[index].x, JSON.stringify(frames)).toBeGreaterThanOrEqual(
				visible[index - 1].x - 1,
			);
		}
		expect(visible.at(-1)?.x).toBeGreaterThan(frames[0].x + 20);
		expect(
			frames
				.filter((frame) => frame.time > 200)
				.every((frame) => frame.opacity <= 0.01),
		).toBe(true);
	});
}
