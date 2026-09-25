import { error } from "@sveltejs/kit";
import { allSlugs } from "$lib/components-docs/catalog";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params, data }) => {
	if (!allSlugs.includes(params.slug)) error(404, "Component not found");
	return { ...data, slug: params.slug };
};
