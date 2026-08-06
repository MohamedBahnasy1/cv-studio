<script lang="ts">
	import { resume } from '$lib/store';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import X from '@lucide/svelte/icons/x';
	import Languages from '@lucide/svelte/icons/languages';
	import FormSectionHeader from './FormSectionHeader.svelte';

	const POPULAR_LANGUAGES = [
		{ label: 'Arabic (العربية)', value: 'Arabic' },
		{ label: 'English (الإنجليزية)', value: 'English' },
		{ label: 'German (الألمانية)', value: 'German' },
		{ label: 'French (الفرنسية)', value: 'French' },
		{ label: 'Spanish (الإسبانية)', value: 'Spanish' },
		{ label: 'Italian (الإيطالية)', value: 'Italian' },
		{ label: 'Russian (الروسية)', value: 'Russian' },
		{ label: 'Chinese (الصينية)', value: 'Chinese' },
		{ label: 'Turkish (التركية)', value: 'Turkish' },
		{ label: 'Japanese (اليابانية)', value: 'Japanese' },
		{ label: 'Other (لغة أخرى...)', value: 'custom' }
	];

	const LANGUAGE_LEVELS = [
		{ label: 'Native / Mother Tongue (اللغة الأم)', value: 'Native proficiency' },
		{ label: 'Fluent (طلاقة)', value: 'Fluent' },
		{ label: 'A1 - Beginner (مبتدئ)', value: 'A1 (Beginner)' },
		{ label: 'A2 - Elementary (أساسي)', value: 'A2 (Elementary)' },
		{ label: 'B1 - Intermediate (متوسط)', value: 'B1 (Intermediate)' },
		{ label: 'B2 - Upper Intermediate (فوق المتوسط)', value: 'B2 (Upper Intermediate)' },
		{ label: 'C1 - Advanced (متقدم)', value: 'C1 (Advanced)' },
		{ label: 'C2 - Proficient (إتقان تّام)', value: 'C2 (Proficient)' }
	];

	function addLanguage() {
		resume.update((state) => ({
			...state,
			languages: [...state.languages, { name: 'English', level: 'Fluent' }]
		}));
	}

	function removeLanguage(index: number) {
		resume.update((state) => ({
			...state,
			languages: state.languages.filter((_, i) => i !== index)
		}));
	}

	function updateLanguage(index: number, field: 'name' | 'level', value: string) {
		resume.update((state) => ({
			...state,
			languages: state.languages.map((item, i) => (i === index ? { ...item, [field]: value } : item))
		}));
	}
</script>

<div class="space-y-3">
	<FormSectionHeader
		buttonText="إضافة لغة"
		emptyText='لم تتم إضافة لغات بعد. اضغط "إضافة لغة" للبدء.'
		isEmpty={$resume.languages.length === 0}
		onadd={addLanguage}
	/>

	{#each $resume.languages as lang, idx}
		<div class="p-3 rounded-xl border border-border bg-card shadow-xs space-y-3">
			<div class="flex items-center gap-2">
				<Languages class="size-4 text-primary shrink-0" />
				<span class="text-xs font-semibold text-muted-foreground">لغة #{idx + 1}</span>
				<div class="flex-1"></div>
				<button
					type="button"
					onclick={() => removeLanguage(idx)}
					title="حذف اللغة"
					class="text-muted-foreground hover:text-destructive p-1 rounded-md cursor-pointer transition-colors"
				>
					<X class="size-4" />
				</button>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<span class="text-xs text-muted-foreground font-medium block">اللغة</span>
					<Select.Root
						type="single"
						value={POPULAR_LANGUAGES.some((l) => l.value === lang.name) ? lang.name : 'custom'}
						onValueChange={(val) => {
							if (val === 'custom') {
								updateLanguage(idx, 'name', '');
							} else if (val) {
								updateLanguage(idx, 'name', val);
							}
						}}
					>
						<Select.Trigger class="w-full h-9 text-xs" dir="ltr">
							{POPULAR_LANGUAGES.find((l) => l.value === lang.name)?.label || lang.name || 'اختر اللغة'}
						</Select.Trigger>
						<Select.Content dir="ltr">
							{#each POPULAR_LANGUAGES as item}
								<Select.Item value={item.value} label={item.label} />
							{/each}
						</Select.Content>
					</Select.Root>

					{#if !POPULAR_LANGUAGES.some((l) => l.value === lang.name)}
						<Input
							placeholder="اسم اللغة"
							value={lang.name}
							oninput={(e: Event) => updateLanguage(idx, 'name', (e.target as HTMLInputElement).value)}
							class="h-8 text-xs mt-1"
						/>
					{/if}
				</div>

				<div class="space-y-1">
					<span class="text-xs text-muted-foreground font-medium block">المستوى</span>
					<Select.Root
						type="single"
						value={lang.level}
						onValueChange={(val) => {
							if (val) updateLanguage(idx, 'level', val);
						}}
					>
						<Select.Trigger class="w-full h-9 text-xs" dir="ltr">
							{LANGUAGE_LEVELS.find((l) => l.value === lang.level)?.label || lang.level || 'اختر المستوى'}
						</Select.Trigger>
						<Select.Content dir="ltr">
							{#each LANGUAGE_LEVELS as levelItem}
								<Select.Item value={levelItem.value} label={levelItem.label} />
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
	{/each}
</div>
