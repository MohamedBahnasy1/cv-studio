import { writable } from 'svelte/store';
import type { ResumeData, PersonalInfo } from './types';
import { browser } from '$app/environment';

const STORAGE_KEY = 'cv-studio-data-v2';

const INITIAL_STATE: ResumeData = {
	personal: {
		fullName: '',
		title: '',
		dob: '',
		nationality: 'Egyptian',
		address: '',
		phone: '',
		email: ''
	},
	profile: '',
	experience: [],
	education: [
		{
			id: crypto.randomUUID(),
			degree: '',
			institution: '',
			fieldOfStudy: '',
			city: '',
			country: '',
			from: '',
			to: '',
			current: false,
			description: ''
		}
	],
	skills: [],
	languages: [],
	awards: [],
	certificates: [],
	publications: [],
	social: []
};

/** Load saved resume state from localStorage with safe fallback */
function loadInitialState(): ResumeData {
	if (!browser) return INITIAL_STATE;
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? { ...INITIAL_STATE, ...JSON.parse(saved) } : INITIAL_STATE;
	} catch {
		return INITIAL_STATE;
	}
}

/** Global reactive store holding current resume state */
export const resume = writable<ResumeData>(loadInitialState());

if (browser) {
	resume.subscribe((value) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		} catch (error) {
			console.warn('Failed to persist resume state:', error);
		}
	});
}

/** Utility to generate unique RFC4122 UUIDs */
export function createId(): string {
	return crypto.randomUUID();
}

/** Update personal information partial */
export function updatePersonal(fields: Partial<PersonalInfo>): void {
	resume.update((state) => ({
		...state,
		personal: { ...state.personal, ...fields }
	}));
}

/** Keys of ResumeData that contain arrays */
export type ArrayKeys = {
	[K in keyof ResumeData]: ResumeData[K] extends unknown[] ? K : never;
}[keyof ResumeData];

/** Element type of an array key in ResumeData */
export type ArrayItem<K extends ArrayKeys> = ResumeData[K] extends (infer U)[] ? U : never;

/** Type contract for items with a unique string ID */
export interface IdentifiableItem {
	id: string;
}

/** Keys of ResumeData whose elements carry a unique ID */
export type IdentifiableArrayKeys = {
	[K in ArrayKeys]: ArrayItem<K> extends IdentifiableItem ? K : never;
}[ArrayKeys];

/** Generic helper to append an item to any array section in the store */
export function addArrayItem<K extends ArrayKeys>(key: K, item: ArrayItem<K>): void {
	resume.update((state) => {
		const list = (state[key] as unknown as ArrayItem<K>[]) || [];
		return {
			...state,
			[key]: [...list, item]
		};
	});
}

/** Generic helper to remove an item by ID from any array section in the store */
export function removeArrayItem<K extends IdentifiableArrayKeys>(key: K, id: string): void {
	resume.update((state) => {
		const list = (state[key] as unknown as (ArrayItem<K> & IdentifiableItem)[]) || [];
		return {
			...state,
			[key]: list.filter((item) => item.id !== id)
		};
	});
}

/** Generic helper to update a field of an item by ID in any array section in the store */
export function updateArrayItem<
	K extends IdentifiableArrayKeys,
	F extends keyof ArrayItem<K>
>(key: K, id: string, field: F, value: ArrayItem<K>[F]): void {
	resume.update((state) => {
		const list = (state[key] as unknown as (ArrayItem<K> & IdentifiableItem)[]) || [];
		return {
			...state,
			[key]: list.map((item) => (item.id === id ? { ...item, [field]: value } : item))
		};
	});
}

/** Reset all resume data to initial empty state */
export function resetResumeStore(): void {
	if (browser) {
		localStorage.removeItem(STORAGE_KEY);
	}
	resume.set({
		personal: {
			fullName: '',
			title: '',
			dob: '',
			nationality: 'Egyptian',
			address: '',
			phone: '',
			email: '',
			photo: undefined
		},
		profile: '',
		experience: [],
		education: [],
		skills: [],
		languages: [],
		awards: [],
		certificates: [],
		publications: [],
		social: []
	});
}