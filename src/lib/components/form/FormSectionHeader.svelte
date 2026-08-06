<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Plus from '@lucide/svelte/icons/plus';

	let {
		buttonText,
		emptyText,
		isEmpty,
		onadd
	}: {
		buttonText: string;
		emptyText: string;
		isEmpty: boolean;
		onadd: () => void;
	} = $props();
</script>

<div class="flex justify-end mb-3">
	<Button variant="outline" size="sm" onclick={onadd}>
		<Plus class="size-4" />
		{buttonText}
	</Button>
</div>

{#if isEmpty}
	<p class="text-sm text-muted-foreground text-center py-4">{emptyText}</p>
{/if}
