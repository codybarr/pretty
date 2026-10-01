import type { Attachment } from "svelte/attachments";

/** Drag the notification surface; leave action and close buttons untouched. */
export function toastDrag(dismiss: () => void): Attachment<HTMLElement> {
	return (node) => {
		let start: { x: number; id: number } | undefined;
		let displacement = 0;

		function reset() {
			start = undefined;
			displacement = 0;
			node.removeAttribute("data-dragging");
			node.style.removeProperty("--toast-drag-x");
		}
		function down(event: PointerEvent) {
			if (!event.isPrimary || event.button !== 0 || start) return;
			if (
				event.target instanceof Element &&
				event.target.closest(
					"button, a, input, textarea, select, [contenteditable]",
				)
			)
				return;
			start = { x: event.clientX, id: event.pointerId };
			node.setPointerCapture(event.pointerId);
		}
		function move(event: PointerEvent) {
			if (!start || event.pointerId !== start.id) return;
			displacement = event.clientX - start.x;
			// Leftward motion meets a soft stop at 24px; rightward motion is direct.
			const x =
				displacement < 0
					? -24 * (1 - Math.exp(displacement / 24))
					: displacement;
			node.setAttribute("data-dragging", "");
			node.style.setProperty("--toast-drag-x", `${x}px`);
		}
		function up(event: PointerEvent) {
			if (!start || event.pointerId !== start.id) return;
			const shouldDismiss = event.clientX - start.x >= 80;
			if (shouldDismiss) {
				// Don't let the CSS close animation start at zero over this one.
				node.setAttribute("data-drag-exit", "");
				// Ark replaces inline styles on close, so an inline CSS variable
				// cannot preserve the drag origin. A DOM animation survives it.
				const x = event.clientX - start.x;
				const reducedMotion = window.matchMedia(
					"(prefers-reduced-motion: reduce)",
				).matches;
				const animation = node.animate(
					[
						{ transform: `translateX(${x}px)`, opacity: 1 },
						{
							transform: `translateX(${x + (reducedMotion ? 0 : 48)}px)`,
							opacity: 0,
						},
					],
					{
						duration: reducedMotion ? 100 : 150,
						easing: "ease-out",
						// Hold the drag origin even during the animation's pending frame.
						fill: "both",
					},
				);
				animation.currentTime = 0;
			}
			if (node.hasPointerCapture(event.pointerId))
				node.releasePointerCapture(event.pointerId);
			reset();
			if (shouldDismiss) dismiss();
		}
		node.addEventListener("pointerdown", down);
		node.addEventListener("pointermove", move);
		node.addEventListener("pointerup", up);
		node.addEventListener("pointercancel", reset);
		node.addEventListener("lostpointercapture", reset);
		return () => {
			node.removeEventListener("pointerdown", down);
			node.removeEventListener("pointermove", move);
			node.removeEventListener("pointerup", up);
			node.removeEventListener("pointercancel", reset);
			node.removeEventListener("lostpointercapture", reset);
			reset();
		};
	};
}
