<script lang="ts">
	import { resume, createId, addArrayItem, removeArrayItem, updateArrayItem } from '$lib/store';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Plus from '@lucide/svelte/icons/plus';
	import SocialIcon from '$lib/components/ui/SocialIcon.svelte';

	const PLATFORMS = [
		{ label: 'LinkedIn', value: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
		{ label: 'GitHub', value: 'github', placeholder: 'https://github.com/username' },
		{ label: 'Twitter / X', value: 'twitter', placeholder: 'https://x.com/username' },
		{ label: 'Facebook', value: 'facebook', placeholder: 'https://facebook.com/username' },
		{ label: 'Website / Portfolio', value: 'website', placeholder: 'https://yourwebsite.com' }
	];

	function addSpecificPlatform(platformValue: string) {
		addArrayItem('social', {
			id: createId(),
			platform: platformValue,
			url: '',
			username: ''
		});
	}

	function getPlaceholder(platformVal: string): string {
		const found = PLATFORMS.find((p) => p.value === platformVal);
		return found ? found.placeholder : 'https://...';
	}
</script>

<div class="space-y-4">
	<!-- Quick Add Platform Pills -->
	<div class="space-y-2 bg-muted/30 p-3 rounded-xl border border-border/60">
		<span class="text-xs font-semibold text-muted-foreground block">إضافة شبكة بسرعة:</span>
		<div class="flex flex-wrap gap-2">
			{#each PLATFORMS as p}
				<button
					type="button"
					onclick={() => addSpecificPlatform(p.value)}
					class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-background hover:bg-accent border border-border/80 rounded-lg shadow-2xs cursor-pointer transition-all hover:scale-102"
				>
					<SocialIcon platform={p.value} class="size-3.5" />
					<span>{p.label}</span>
					<Plus class="size-3 text-muted-foreground ml-0.5" />
				</button>
			{/each}
		</div>
	</div>

	<!-- Social Items List -->
	{#if $resume.social && $resume.social.length > 0}
		<div class="space-y-2.5">
			{#each $resume.social as item (item.id)}
				<div class="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-card shadow-2xs group hover:border-border/80 transition-all">
					<!-- Platform Selector Dropdown -->
					<Select.Root
						type="single"
						value={item.platform}
						onValueChange={(val) => { if (val) updateArrayItem('social', item.id, 'platform', val); }}
					>
						<Select.Trigger class="h-9 text-xs w-[150px] shrink-0 gap-2 bg-muted/40 font-medium" dir="ltr">
							<SocialIcon platform={item.platform} class="size-4 shrink-0" />
							<span class="truncate">
								{PLATFORMS.find((p) => p.value === item.platform)?.label || item.platform}
							</span>
						</Select.Trigger>
						<Select.Content dir="ltr">
							{#each PLATFORMS as p}
								<Select.Item value={p.value} label={p.label}>
									<div class="flex items-center gap-2">
										<SocialIcon platform={p.value} class="size-4 shrink-0" />
										<span>{p.label}</span>
									</div>
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>

					<!-- URL Input -->
					<div class="flex-1 min-w-0" dir="ltr">
						<Input
							placeholder={getPlaceholder(item.platform)}
							value={item.url}
							oninput={(e: Event) => updateArrayItem('social', item.id, 'url', (e.target as HTMLInputElement).value)}
							class="h-9 text-xs font-mono"
						/>
					</div>

					<!-- Delete Button -->
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onclick={() => removeArrayItem('social', item.id)}
						title="حذف الرابط"
						class="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 cursor-pointer"
					>
						<Trash2 class="size-4" />
					</Button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-center py-6 border-2 border-dashed border-muted rounded-xl">
			<p class="text-sm text-muted-foreground">لم تتم إضافة روابط تواصل بعد.</p>
			<p class="text-xs text-muted-foreground/70 mt-1">اضغط على إحدى الأزرار أعلاه لإضافة رابط حسابك بسرعة.</p>
		</div>
	{/if}
</div>
