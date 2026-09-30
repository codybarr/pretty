import { cva } from "class-variance-authority";

export const button = cva(
	"inline-flex shrink-0 items-center justify-center gap-sm rounded-xs border font-semibold leading-tight whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 motion-reduce:transition-none",
	{
		variants: {
			variant: {
				primary:
					"border-primary-action bg-primary-action text-primary-foreground enabled:hover:brightness-95 enabled:active:brightness-90",
				secondary:
					"border-transparent bg-muted text-foreground enabled:hover:bg-border enabled:active:bg-muted",
				outline:
					"border-border bg-surface text-foreground enabled:hover:border-primary enabled:hover:bg-accent enabled:active:bg-muted",
				ghost:
					"border-transparent bg-transparent text-foreground enabled:hover:bg-muted enabled:active:bg-border",
				danger:
					"border-danger bg-danger text-danger-foreground enabled:hover:brightness-95 enabled:active:brightness-90",
			},
			size: {
				sm: "min-h-button-sm px-sm py-xs text-xs",
				md: "min-h-button-md px-md py-sm text-sm",
				lg: "min-h-button-lg px-lg py-sm text-base",
			},
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
	"flex shrink-0 items-center rounded-xs bg-muted-foreground p-xs inset-shadow-sm transition-colors ark-checked:bg-primary motion-reduce:transition-none",
	{
		variants: {
			size: { sm: "h-md w-xl", md: "h-lg w-2xl", lg: "h-xl w-3xl" },
		},
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
