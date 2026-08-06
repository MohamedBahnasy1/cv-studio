import type {
	SkillItem,
	SkillCategory,
	PersonalInfo,
	ExperienceItem,
	EducationItem,
	AwardItem,
	CertificateItem,
	PublicationItem,
	SocialItem,
	LanguageItem
} from './types';

/** Extract skill item name safely */
export function getSkillName(item: string | SkillItem): string {
	return typeof item === 'string' ? item : item.name;
}

/** Extract skill item proficiency percentage safely */
export function getSkillPercent(item: string | SkillItem, defaultPercent = 70): number {
	if (typeof item === 'string') return defaultPercent;
	return item.level ?? defaultPercent;
}

/** Convert language level string to numerical percentage (0-100) */
export function levelToPercent(level?: string, defaultPercent = 75): number {
	if (!level) return defaultPercent;
	const key = level.toLowerCase().trim();

	if (key.includes('a1')) return 30;
	if (key.includes('a2')) return 45;
	if (key.includes('b1')) return 60;
	if (key.includes('b2')) return 75;
	if (key.includes('c1')) return 90;
	if (key.includes('c2')) return 100;
	if (key.includes('native') || key.includes('لغة أم')) return 100;
	if (key.includes('fluent') || key.includes('طلاقة')) return 95;
	if (key.includes('advanced') || key.includes('متقدم')) return 85;
	if (key.includes('intermediate') || key.includes('متوسط')) return 65;
	if (key.includes('beginner') || key.includes('مبتدئ')) return 35;

	return defaultPercent;
}

/** Convert language level string to percentage string e.g. "80%" */
export function levelToPercentStr(level?: string, defaultStr = '80%'): string {
	if (!level) return defaultStr;
	return `${levelToPercent(level, parseInt(defaultStr, 10))}%`;
}

/** Format date range e.g. "09/2023 – Present" or "2020 – 2022" */
export function formatDateRange(from?: string, to?: string, current?: boolean, presentLabel = 'Present'): string {
	if (!from && !to && !current) return '';
	if (from && !to && !current) return from;
	const end = current ? presentLabel : to;
	return `${from || ''}${end ? ` – ${end}` : ''}`;
}

/** Format location string e.g. "Cairo, Egypt" */
export function formatLocation(city?: string, country?: string): string {
	return [city, country].filter(Boolean).join(', ');
}

/** Format composite title with optional subtitle e.g. "B.Sc in Nursing | Damanhour University" */
export function formatTitleWithSub(title?: string, sub?: string, separator = ' | '): string {
	return [title, sub].filter(Boolean).join(separator);
}

/** Check if personal contact information is present */
export function hasContactInfo(p?: PersonalInfo): boolean {
	if (!p) return false;
	return !!(p.dob || p.nationality || p.address || p.phone || p.email);
}

/** Check if non-empty profile text exists */
export function hasProfile(profile?: string): boolean {
	return !!profile?.trim();
}

/** Check if experience items exist with content */
export function hasExperience(experience?: ExperienceItem[]): boolean {
	return !!(experience && experience.length > 0 && experience.some((e) => e.jobTitle || e.company));
}

/** Check if education items exist with content */
export function hasEducation(education?: EducationItem[]): boolean {
	return !!(
		education &&
		education.length > 0 &&
		education.some((e) => e.degree || e.institution || e.fieldOfStudy)
	);
}

/** Check if award items exist with content */
export function hasAwards(awards?: AwardItem[]): boolean {
	return !!(awards && awards.length > 0 && awards.some((a) => a.title || a.issuer));
}

/** Check if certificate items exist with content */
export function hasCertificates(certificates?: CertificateItem[]): boolean {
	return !!(certificates && certificates.length > 0 && certificates.some((c) => c.name || c.authority));
}

/** Check if publication items exist with content */
export function hasPublications(publications?: PublicationItem[]): boolean {
	return !!(publications && publications.length > 0 && publications.some((pub) => pub.title || pub.publisher));
}

/** Check if social items exist with content */
export function hasSocial(social?: SocialItem[]): boolean {
	return !!(social && social.length > 0 && social.some((s) => s.url || s.username));
}

/** Check if language items exist with content */
export function hasLanguages(languages?: LanguageItem[]): boolean {
	return !!(languages && languages.length > 0 && languages.some((l) => l.name));
}

/** Filter non-empty skill categories */
export function getActiveSkillCategories(skills?: SkillCategory[]): SkillCategory[] {
	return (skills || []).filter((cat) =>
		cat.items.some((item) => (typeof item === 'string' ? item.trim() !== '' : item.name.trim() !== ''))
	);
}

/** Clean and format social URL for display e.g. "linkedin.com/in/user" */
export function formatSocialUrl(url?: string): string {
	if (!url) return '';
	return url
		.replace(/^https?:\/\//i, '')
		.replace(/^www\./i, '')
		.replace(/\/$/, '');
}
