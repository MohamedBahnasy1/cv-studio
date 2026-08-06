<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type Quill from 'quill';
	import 'quill/dist/quill.snow.css';

	let { value = $bindable(''), placeholder = 'Enter text...', onchange }: { value?: string, placeholder?: string, onchange?: (val: string) => void } = $props();
	
	let editorContainer: HTMLDivElement;
	let quill: Quill;
	let isInternalChange = false;

	onMount(async () => {
		const QuillModule = await import('quill');
		const Quill = QuillModule.default;

		quill = new Quill(editorContainer, {
			theme: 'snow',
			placeholder: placeholder,
			modules: {
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],
					[{ 'align': [] }],
					[{ 'list': 'ordered'}, { 'list': 'bullet' }],
					['link']
				]
			}
		});

		// Add Arabic tooltips to the generated toolbar buttons
		const toolbar = editorContainer.parentElement?.querySelector('.ql-toolbar');
		if (toolbar) {
			const tooltips: Record<string, string> = {
				'.ql-bold': 'عريض (Bold)',
				'.ql-italic': 'مائل (Italic)',
				'.ql-underline': 'تسطير (Underline)',
				'.ql-strike': 'شطب (Strikethrough)',
				'.ql-align': 'محاذاة النص (Alignment)',
				'.ql-list[value="ordered"]': 'قائمة رقمية (Numbered List)',
				'.ql-list[value="bullet"]': 'قائمة نقطية (Bullet List)',
				'.ql-link': 'إدراج رابط (Link)'
			};

			for (const [selector, text] of Object.entries(tooltips)) {
				const buttons = toolbar.querySelectorAll(selector);
				buttons.forEach(btn => btn.setAttribute('title', text));
			}
		}

		if (value) {
			quill.root.innerHTML = value;
		}

		quill.on('text-change', () => {
			isInternalChange = true;
			const html = quill.root.innerHTML;
			value = html;
			if (onchange) onchange(html);
			isInternalChange = false;
		});
	});

	$effect(() => {
		if (quill && value !== quill.root.innerHTML && !isInternalChange) {
			quill.root.innerHTML = value || '';
		}
	});

	onDestroy(() => {
		if (quill) {
			quill.off('text-change');
		}
	});
</script>

<div class="quill-wrapper rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 mb-2">
	<div bind:this={editorContainer} class="min-h-[120px] text-sm" dir="ltr"></div>
</div>

<style>
	:global(.ql-toolbar.ql-snow) {
		border: none !important;
		border-bottom: 1px solid var(--border) !important;
		background-color: hsl(var(--muted) / 0.4);
		border-radius: 0.375rem 0.375rem 0 0;
	}
	:global(.ql-container.ql-snow) {
		border: none !important;
		font-family: inherit !important;
		border-radius: 0 0 0.375rem 0.375rem;
	}
	:global(.ql-editor) {
		min-height: 120px;
		font-size: 0.875rem;
		line-height: 1.5;
	}
</style>
