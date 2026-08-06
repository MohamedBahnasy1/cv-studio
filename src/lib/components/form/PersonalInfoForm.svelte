<script lang="ts">
	import { resume, updatePersonal } from "$lib/store";
	import type { PersonalInfo } from "$lib/types";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import UserRound from "@lucide/svelte/icons/user-round";
	import Trash2 from "@lucide/svelte/icons/trash-2";

	const POPULAR_NATIONALITIES = [
		{ label: "Egyptian (مصري)", value: "Egyptian" },
		{ label: "Saudi (سعودي)", value: "Saudi" },
		{ label: "Emirati (إماراتي)", value: "Emirati" },
		{ label: "Kuwaiti (كويتي)", value: "Kuwaiti" },
		{ label: "Qatari (قطري)", value: "Qatari" },
		{ label: "Omani (عماني)", value: "Omani" },
		{ label: "Bahraini (بحريني)", value: "Bahraini" },
		{ label: "Jordanian (أردني)", value: "Jordanian" },
		{ label: "Palestinian (فلسطيني)", value: "Palestinian" },
		{ label: "Syrian (سوري)", value: "Syrian" },
		{ label: "Lebanese (لبناني)", value: "Lebanese" },
		{ label: "Sudanese (سوداني)", value: "Sudanese" },
		{ label: "Iraqi (عراقي)", value: "Iraqi" },
		{ label: "Yemeni (يمني)", value: "Yemeni" },
		{ label: "Moroccan (مغربي)", value: "Moroccan" },
		{ label: "Algerian (جزائري)", value: "Algerian" },
		{ label: "Tunisian (تونسي)", value: "Tunisian" },
		{ label: "Libyan (ليبي)", value: "Libyan" },
		{ label: "American (أمريكي)", value: "American" },
		{ label: "British (بريطاني)", value: "British" },
		{ label: "Other (جنسية أخرى...)", value: "custom" },
	];

	function handleFieldInput(field: keyof PersonalInfo, e: Event) {
		const value = (e.target as HTMLInputElement).value;
		updatePersonal({ [field]: value });
	}

	function handlePhotoUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				updatePersonal({ photo: reader.result });
			}
		};
		reader.readAsDataURL(file);
	}

	function removePhoto() {
		updatePersonal({ photo: undefined });
	}
</script>

<div class="space-y-3">
	<!-- Photo Selection -->
	<div class="flex items-center gap-3">
		{#if $resume.personal.photo}
			<img
				src={$resume.personal.photo}
				alt="صورة شخصية"
				class="size-16 rounded-full object-cover border-2 border-muted"
			/>
			<Button
				type="button"
				onclick={removePhoto}
				title="حذف الصورة"
				variant="destructive"
				size="sm"
			>
				<Trash2 class="size-4" />
			</Button>
		{:else}
			<label
				class="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<div
					class="size-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30"
				>
					<UserRound class="size-6 text-muted-foreground/50" />
				</div>
				<span>إضافة صورة</span>
				<input
					type="file"
					accept="image/*"
					class="hidden"
					onchange={handlePhotoUpload}
				/>
			</label>
		{/if}
	</div>

	<!-- Full Name & Job Title -->
	<div class="grid grid-cols-2 gap-3">
		<div class="space-y-1">
			<Label for="fullName">الاسم الكامل</Label>
			<Input
				id="fullName"
				placeholder="Mohamed Bahnasy"
				value={$resume.personal.fullName}
				oninput={(e) => handleFieldInput("fullName", e)}
			/>
		</div>
		<div class="space-y-1">
			<Label for="title">المسمى الوظيفي</Label>
			<Input
				id="title"
				placeholder="Demonstrator"
				value={$resume.personal.title}
				oninput={(e) => handleFieldInput("title", e)}
			/>
		</div>
	</div>

	<!-- Phone & Email -->
	<div class="grid grid-cols-2 gap-3">
		<div class="space-y-1">
			<Label for="phone">رقم الهاتف</Label>
			<Input
				id="phone"
				type="tel"
				placeholder="01062078243"
				value={$resume.personal.phone}
				oninput={(e) => handleFieldInput("phone", e)}
			/>
		</div>
		<div class="space-y-1">
			<Label for="email">البريد الإلكتروني</Label>
			<Input
				id="email"
				type="email"
				placeholder="example@gmail.com"
				value={$resume.personal.email}
				oninput={(e) => handleFieldInput("email", e)}
			/>
		</div>
	</div>

	<!-- Date of Birth & Nationality -->
	<div class="grid grid-cols-2 gap-3">
		<div class="space-y-1">
			<Label for="dob">تاريخ الميلاد</Label>
			<Input
				id="dob"
				placeholder="21-6-2000"
				value={$resume.personal.dob}
				oninput={(e) => handleFieldInput("dob", e)}
			/>
		</div>
		<div class="space-y-1">
			<Label for="nationality">الجنسية</Label>
			<Select.Root
				type="single"
				value={POPULAR_NATIONALITIES.some(
					(n) => n.value === $resume.personal.nationality,
				)
					? $resume.personal.nationality
					: "custom"}
				onValueChange={(val) => {
					if (val === "custom") {
						updatePersonal({ nationality: "" });
					} else if (val) {
						updatePersonal({ nationality: val });
					}
				}}
			>
				<Select.Trigger class="w-full h-9 text-xs" dir="ltr">
					{POPULAR_NATIONALITIES.find(
						(n) => n.value === $resume.personal.nationality,
					)?.label ||
						($resume.personal.nationality
							? $resume.personal.nationality
							: "Other (جنسية أخرى...)")}
				</Select.Trigger>
				<Select.Content dir="ltr">
					{#each POPULAR_NATIONALITIES as item}
						<Select.Item value={item.value} label={item.label} />
					{/each}
				</Select.Content>
			</Select.Root>

			<!-- Custom input if nationality is custom / not in preset list -->
			{#if !POPULAR_NATIONALITIES.some((n) => n.value === $resume.personal.nationality)}
				<Input
					placeholder="اكتب الجنسية..."
					value={$resume.personal.nationality}
					oninput={(e) => handleFieldInput("nationality", e)}
					class="h-8 text-xs mt-1"
				/>
			{/if}
		</div>
	</div>

	<!-- Physical Address -->
	<div class="space-y-1">
		<Label for="address">العنوان</Label>
		<Input
			id="address"
			placeholder="Dammanhour Elbehara, Egypt"
			value={$resume.personal.address}
			oninput={(e) => handleFieldInput("address", e)}
		/>
	</div>
</div>
