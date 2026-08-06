<script lang="ts">
	import { resume, createId, addArrayItem, removeArrayItem, updateArrayItem } from '$lib/store';
	import type { PublicationItem } from '$lib/types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';
	import FormCollapsibleItem from './FormCollapsibleItem.svelte';
	import FormSectionHeader from './FormSectionHeader.svelte';

	function addPublication() {
		addArrayItem('publications', {
			id: createId(),
			title: '',
			publisher: '',
			url: '',
			date: '',
			description: ''
		});
	}
</script>

<div class="space-y-3">
	<FormSectionHeader
		buttonText="إضافة بحث / منشور"
		emptyText='لم تتم إضافة أبحاث بعد. اضغط "إضافة بحث / منشور" للبدء.'
		isEmpty={!($resume.publications && $resume.publications.length > 0)}
		onadd={addPublication}
	/>

	{#each $resume.publications || [] as item, i (item.id)}
		<FormCollapsibleItem
			title={item.title}
			fallbackTitle="بحث"
			index={i}
			onremove={() => removeArrayItem('publications', item.id)}
		>
			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>عنوان البحث / المقال</Label>
					<Input
						placeholder="عنوان الورقة البحثية أو المنشور العلمي"
						value={item.title}
						oninput={(e: Event) => updateArrayItem('publications', item.id, 'title', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>دار النشر / المجلة العلمية</Label>
					<Input
						placeholder="مثال: Nature / IEEE Transactions"
						value={item.publisher}
						oninput={(e: Event) => updateArrayItem('publications', item.id, 'publisher', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>رابط DOI / الرقم المعياري</Label>
					<Input
						placeholder="https://doi.org/..."
						value={item.url}
						oninput={(e: Event) => updateArrayItem('publications', item.id, 'url', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>تاريخ النشر</Label>
					<Input
						placeholder="MM/YYYY"
						value={item.date}
						oninput={(e: Event) => updateArrayItem('publications', item.id, 'date', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="space-y-1">
				<Label class="mb-1 block">الملخص والتفاصيل</Label>
				<RichTextEditor
					placeholder="ملخص عن موضوع البحث والنتائج الرئيسية..."
					value={item.description}
					onchange={(val: string) => updateArrayItem('publications', item.id, 'description', val)}
				/>
			</div>
		</FormCollapsibleItem>
	{/each}
</div>
