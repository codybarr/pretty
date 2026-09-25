<script lang="ts">
import { Tabs as ArkTabs } from "@ark-ui/svelte/tabs";
import { focus, tabsTrigger } from "./variants";
import type { Snippet } from "svelte";

type Tab = { label: string; value: string; content: Snippet };
let {
	tabs,
	value = $bindable(""),
	density = "comfortable",
	class: className = "",
}: {
	tabs: Tab[];
	value?: string;
	density?: "compact" | "comfortable";
	class?: string;
} = $props();
let active = $derived(value || tabs[0]?.value || "");
</script>

<ArkTabs.Root class={`${className}`}  value={active} onValueChange={(details) => value = details.value}>
  <ArkTabs.List class="flex gap-md border-b border-border">
    {#each tabs as tab (tab.value)}<ArkTabs.Trigger class={`${tabsTrigger({ density })} ${focus()}`}  value={tab.value}>{tab.label}</ArkTabs.Trigger>{/each}
  </ArkTabs.List>
  {#each tabs as tab (tab.value)}<ArkTabs.Content class={`py-md text-sm text-foreground ${focus()}`}  value={tab.value}>{@render tab.content()}</ArkTabs.Content>{/each}
</ArkTabs.Root>
