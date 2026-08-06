<script lang="ts">
	import { resume, createId } from '$lib/store';
	import { getSkillName, getSkillPercent } from '$lib/template-utils';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Plus from '@lucide/svelte/icons/plus';
	import X from '@lucide/svelte/icons/x';
	import Layers from '@lucide/svelte/icons/layers';
	import Gauge from '@lucide/svelte/icons/gauge';
	import FormSectionHeader from './FormSectionHeader.svelte';

	function addCategory() {
		resume.update((state) => ({
			...state,
			skills: [...state.skills, { id: createId(), category: '', items: [] }]
		}));
	}

	function removeCategory(id: string) {
		resume.update((state) => ({ ...state, skills: state.skills.filter((s) => s.id !== id) }));
	}

	function updateCategoryTitle(id: string, title: string) {
		resume.update((state) => ({
			...state,
			skills: state.skills.map((s) => (s.id === id ? { ...s, category: title } : s))
		}));
	}

	function addSkill(catId: string) {
		resume.update((state) => ({
			...state,
			skills: state.skills.map((s) => {
				if (s.id !== catId) return s;
				return { ...s, items: [...s.items, { name: '', level: 75 }] };
			})
		}));
	}

	function updateSkillName(catId: string, idx: number, val: string) {
		resume.update((state) => ({
			...state,
			skills: state.skills.map((s) => {
				if (s.id !== catId) return s;
				const items = [...s.items];
				const current = items[idx];
				const currentLevel = typeof current === 'string' ? 75 : current.level;
				items[idx] = { name: val, level: currentLevel };
				return { ...s, items };
			})
		}));
	}

	function updateSkillLevel(catId: string, idx: number, level: number) {
		resume.update((state) => ({
			...state,
			skills: state.skills.map((s) => {
				if (s.id !== catId) return s;
				const items = [...s.items];
				const current = items[idx];
				const currentName = typeof current === 'string' ? current : current.name;
				items[idx] = { name: currentName, level };
				return { ...s, items };
			})
		}));
	}

	function removeSkill(catId: string, idx: number) {
		resume.update((state) => ({
			...state,
			skills: state.skills.map((s) => {
				if (s.id !== catId) return s;
				return { ...s, items: s.items.filter((_, i) => i !== idx) };
			})
		}));
	}
</script>

<div class="space-y-4">
	<FormSectionHeader
		buttonText="فئة جديدة"
		emptyText='لم تتم إضافة مهارات بعد. اضغط "فئة جديدة" للبدء.'
		isEmpty={$resume.skills.length === 0}
		onadd={addCategory}
	/>

	{#each $resume.skills as cat (cat.id)}
		<div class="rounded-xl border border-border bg-card shadow-xs overflow-hidden transition-all">
			<div class="bg-muted/70 px-3 py-2.5 border-b border-border flex items-center justify-between gap-2">
				<div class="flex items-center gap-2 flex-1">
					<Layers class="size-4 text-primary shrink-0" />
					<Input
						placeholder="EDUCATIONAL & TEACHING SKILLS"
						value={cat.category}
						oninput={(e: Event) => updateCategoryTitle(cat.id, (e.target as HTMLInputElement).value)}
						class="font-semibold bg-background border-border/80 text-sm h-8"
					/>
				</div>
				<button
					type="button"
					onclick={() => removeCategory(cat.id)}
					title="حذف الفئة"
					class="text-destructive hover:bg-destructive/15 p-1.5 rounded-md cursor-pointer transition-colors"
				>
					<Trash2 class="size-4" />
				</button>
			</div>

			<div class="p-3 space-y-3">
				{#each cat.items as skillItem, idx}
					<div class="flex items-center gap-3 bg-muted/20 p-2.5 rounded-lg border border-border/40">
						<div class="flex-1 min-w-[130px]">
							<Input
								placeholder="Educational Technology"
								value={getSkillName(skillItem)}
								oninput={(e: Event) => updateSkillName(cat.id, idx, (e.target as HTMLInputElement).value)}
								class="h-8 text-sm"
							/>
						</div>

						<div class="flex items-center gap-2 flex-1">
							<Gauge class="size-3.5 text-muted-foreground shrink-0" />
							<div class="relative flex-1 flex items-center" dir="ltr">
								<Progress value={getSkillPercent(skillItem)} class="h-2 w-full" />
								<input
									type="range"
									min="10"
									max="100"
									step="5"
									dir="ltr"
									value={getSkillPercent(skillItem)}
									oninput={(e: Event) => updateSkillLevel(cat.id, idx, Number((e.target as HTMLInputElement).value))}
									class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								/>
							</div>

							<span class="text-xs font-semibold text-muted-foreground w-9 text-right shrink-0">
								{getSkillPercent(skillItem)}%
							</span>
						</div>

						<button
							type="button"
							onclick={() => removeSkill(cat.id, idx)}
							title="حذف المهارة"
							class="text-muted-foreground hover:text-destructive p-1 rounded-md cursor-pointer transition-colors"
						>
							<X class="size-4" />
						</button>
					</div>
				{/each}

				<Button
					variant="ghost"
					size="sm"
					onclick={() => addSkill(cat.id)}
					class="w-full border-2 border-dashed border-primary/40 text-primary hover:bg-primary/10 hover:border-primary font-medium py-2 rounded-lg transition-all"
				>
					<Plus class="size-4 ml-1" />
					إضافة مهارة
				</Button>
			</div>
		</div>
	{/each}
</div>
