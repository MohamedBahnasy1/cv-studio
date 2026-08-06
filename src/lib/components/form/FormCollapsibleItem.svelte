<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { Button } from '$lib/components/ui/button/index.js';
	
	let {
		title,
		fallbackTitle,
		index,
		onremove,
		children
	}: {
		title?: string;
		fallbackTitle: string;
		index: number;
		onremove: () => void;
		children: Snippet;
	} = $props();
</script>

<Collapsible.Root open={true}>
	<div class="flex items-center justify-between p-2 rounded-md bg-muted/50 border border-border">
		<Collapsible.Trigger class="flex items-center gap-2 text-sm font-medium flex-1 cursor-pointer">
			<ChevronDown class="size-4 transition-transform" />
			{title || `${fallbackTitle} #${index + 1}`}
		</Collapsible.Trigger>
		<Button
			type="button"
			onclick={onremove}
			variant="destructive"
			title="حذف"
		>
			<Trash2 class="size-4" />
		</Button>
	</div>

	<Collapsible.Content class="pt-3 space-y-3 px-1">
		{@render children()}
	</Collapsible.Content>
</Collapsible.Root>
