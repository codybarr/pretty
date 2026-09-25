import { cva } from "class-variance-authority";

export const button = cva(
	"inline-flex min-h-2xl items-center justify-center gap-sm rounded-xs border px-md text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 data-disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"border-primary bg-primary text-primary-foreground hover:brightness-95",
				outline:
					"border-border bg-surface text-foreground hover:border-primary hover:bg-accent",
				ghost:
					"border-transparent bg-transparent text-foreground hover:bg-muted",
			},
			size: { sm: "min-h-lg px-sm text-xs", md: "min-h-2xl px-md text-sm" },
		},
		defaultVariants: { variant: "outline", size: "md" },
	},
);

export const control = cva(
	"border border-border bg-surface text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary data-invalid:border-primary data-disabled:opacity-50",
	{
		variants: { size: { sm: "min-h-lg text-xs", md: "min-h-2xl text-sm" } },
		defaultVariants: { size: "md" },
	},
);

export const checkboxControl = cva(
	"grid shrink-0 place-items-center rounded-xs border border-border bg-surface text-primary-foreground ark-checked:border-primary ark-checked:bg-primary ark-indeterminate:border-primary ark-indeterminate:bg-primary",
	{
		variants: { size: { sm: "size-sm", md: "size-md" } },
		defaultVariants: { size: "md" },
	},
);
export const switchControl = cva(
	"flex shrink-0 items-center rounded-full bg-muted-foreground p-xs transition-colors ark-checked:bg-primary",
	{
		variants: { size: { sm: "h-md w-xl", md: "h-lg w-2xl" } },
		defaultVariants: { size: "md" },
	},
);
export const dialogContent = cva("relative w-full p-lg", {
	variants: { size: { sm: "max-w-panel-copy", md: "max-w-copy" } },
	defaultVariants: { size: "md" },
});
export const tabsTrigger = cva(
	"cursor-pointer border-b-2 border-transparent py-sm text-sm text-muted-foreground data-selected:border-primary data-selected:font-semibold data-selected:text-primary",
	{
		variants: { density: { compact: "px-xs", comfortable: "px-sm" } },
		defaultVariants: { density: "comfortable" },
	},
);
export const label = cva("text-sm font-semibold text-foreground");
export const field = cva("grid gap-xs text-foreground");
export const panel = cva(
	"z-50 rounded-sm border border-border bg-surface text-surface-foreground shadow-xl",
);
export const option = cva(
	"flex cursor-pointer items-center justify-between gap-sm rounded-xs px-sm py-sm text-sm text-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50",
);
export const focus = cva(
	"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary",
);
