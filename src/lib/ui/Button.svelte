<script lang="ts">
import type { VariantProps } from "class-variance-authority";
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { button } from "./variants";

type Props = HTMLButtonAttributes & {
	variant?: NonNullable<VariantProps<typeof button>["variant"]>;
	size?: NonNullable<VariantProps<typeof button>["size"]>;
	children?: Snippet;
	ref?: HTMLButtonElement;
};

let {
	variant = "primary",
	size = "md",
	type = "button",
	class: className = "",
	children,
	ref = $bindable(),
	...rest
}: Props = $props();
</script>

<button bind:this={ref} {...rest} {type} class={[button({ variant, size }), className]}>
  {@render children?.()}
</button>
