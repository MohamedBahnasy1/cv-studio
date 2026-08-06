<script lang="ts">
	import { resume, createId, addArrayItem, removeArrayItem, updateArrayItem } from '$lib/store';
	import type { AwardItem } from '$lib/types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';
	import FormCollapsibleItem from './FormCollapsibleItem.svelte';
	import FormSectionHeader from './FormSectionHeader.svelte';

	function addAward() {
		addArrayItem('awards', {
			id: createId(),
			title: '',
			issuer: '',
			url: '',
			date: '',
			description: ''
		});
	}
</script>

<div class="space-y-3">
	<FormSectionHeader
		buttonText="إضافة جائزة"
		emptyText='لم تتم إضافة جوائز بعد. اضغط "إضافة جائزة" للبدء.'
		isEmpty={!($resume.awards && $resume.awards.length > 0)}
		onadd={addAward}
	/>

	{#each $resume.awards || [] as item, i (item.id)}
		<FormCollapsibleItem
			title={item.title}
			fallbackTitle="جائزة"
			index={i}
			onremove={() => removeArrayItem('awards', item.id)}
		>
			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>عنوان الجائزة / التكريم</Label>
					<Input
						placeholder="مثال: Best Innovation Award"
						value={item.title}
						oninput={(e: Event) => updateArrayItem('awards', item.id, 'title', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>الجهة المانحة</Label>
					<Input
						placeholder="مثال: IEEE / Ministry of Health"
						value={item.issuer}
						oninput={(e: Event) => updateArrayItem('awards', item.id, 'issuer', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>رابط الجائزة / الشهادة</Label>
					<Input
						placeholder="https://..."
						value={item.url}
						oninput={(e: Event) => updateArrayItem('awards', item.id, 'url', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>تاريخ الحصول عليها</Label>
					<Input
						placeholder="MM/YYYY"
						value={item.date}
						oninput={(e: Event) => updateArrayItem('awards', item.id, 'date', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="space-y-1">
				<Label class="mb-1 block">الوصف والتفاصيل</Label>
				<RichTextEditor
					placeholder="معلومات إضافية عن الجائزة ومعايير استحقاقها..."
					value={item.description}
					onchange={(val: string) => updateArrayItem('awards', item.id, 'description', val)}
				/>
			</div>
		</FormCollapsibleItem>
	{/each}
</div>
