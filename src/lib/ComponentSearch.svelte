<script lang="ts">
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { IconSearch } from "@tabler/icons-svelte";
import { groups, titleFor } from "$lib/components-docs/catalog";
import { Combobox, Dialog, button } from "$lib/ui";

let open = $state(false);
const inputId = $props.id();
const options = groups.flatMap((group) =>
	group.slugs.map((slug) => ({
		label: titleFor(slug),
		value: slug,
		description: group.title,
	})),
);

function shortcut(event: KeyboardEvent) {
	if (
		(event.metaKey || event.ctrlKey) &&
		event.key.toLowerCase() === "k" &&
		!event.altKey &&
		!event.shiftKey &&
		!event.isComposing
	) {
		event.preventDefault();
		if (!event.repeat) open = !open;
	}
}

function navigate(slug: string) {
	open = false;
	void goto(resolve("/components/[slug]", { slug }));
}
</script>

<svelte:window onkeydown={shortcut} />

{#snippet trigger()}<IconSearch size={18} aria-hidden="true" />{/snippet}
<Dialog
  title="Find a component" {trigger} bind:open layout="search"
  triggerClass={`${button({ variant: 'ghost', size: 'sm' })} size-button-md p-0 text-muted-foreground`}
  triggerLabel="Search components"
  triggerTitle="Search components (⌘K / Ctrl+K)"
  initialFocusEl={() => document.getElementById(inputId)}
>
  <Combobox label="Search components" placeholder="Find a component…" {options} {inputId} inline onselect={navigate} ondismiss={() => open = false} />
</Dialog>
