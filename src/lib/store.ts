import { writable } from 'svelte/store';
import type { ResumeData } from './types';
import { browser } from '$app/environment';

const STORAGE_KEY = 'resume-data-v1';

const empty: ResumeData = {
    personal: { fullName: '', title: '', dob: '', nationality: '', address: '', phone: '', email: '' },
    profile: '',
    experience: [],
    education: [],
    skills: [],
    languages: []
};

function loadInitial(): ResumeData {
    if (!browser) return empty;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : empty;
}

export const resume = writable<ResumeData>(loadInitial());

if (browser) {
    resume.subscribe((value) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
}