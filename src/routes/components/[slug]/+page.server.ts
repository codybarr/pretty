import { examples } from "$lib/components-docs/catalog";
import { createHighlighter } from "shiki";
import type { PageServerLoad } from "./$types";

// Reuse the grammar and theme across requests; only serializable tokens reach the browser.
const highlighter = createHighlighter({
	themes: ["github-dark"],
	langs: ["svelte"],
});

export const load: PageServerLoad = async ({ params }) => {
	const example = examples[params.slug];
	if (!example) return { codeLines: null };

	const { tokens } = (await highlighter).codeToTokens(example.code, {
		lang: "svelte",
		theme: "github-dark",
	});
	return {
		codeLines: tokens.map((line, index) => ({
			number: index + 1,
			tokens: line.map(({ content, color, offset }) => ({
				content,
				color,
				offset,
			})),
		})),
	};
};
