'use client';

const SECTION_SCROLL_OFFSETS = {
    work: -16,
    about: 64,
} as const;

const HASH_SCROLL_RETRY_MS = 80;
const HASH_SCROLL_MAX_ATTEMPTS = 10;

export type HomeSectionId = keyof typeof SECTION_SCROLL_OFFSETS;

function isHomeSectionId(sectionId: string): sectionId is HomeSectionId {
    return sectionId in SECTION_SCROLL_OFFSETS;
}

export function scrollToHomeSection(sectionId: HomeSectionId, behavior: ScrollBehavior = 'smooth'): boolean {
    const element = document.getElementById(sectionId);

    if (!element) {
        return false;
    }

    const offset = SECTION_SCROLL_OFFSETS[sectionId];
    const top = element.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({ top, behavior });
    return true;
}

export function scrollToHomeSectionFromHash(hash: string, behavior: ScrollBehavior = 'auto'): boolean {
    const normalizedHash = hash.startsWith('#') ? hash.slice(1) : hash;

    if (!isHomeSectionId(normalizedHash)) {
        return false;
    }

    return scrollToHomeSection(normalizedHash, behavior);
}

export function scrollToHomeSectionFromHashWithRetry(hash: string): boolean {
    const normalizedHash = hash.startsWith('#') ? hash.slice(1) : hash;

    if (!isHomeSectionId(normalizedHash)) {
        return false;
    }

    let attemptCount = 0;

    const tryScroll = () => {
        const didScroll = scrollToHomeSection(normalizedHash, 'auto');

        if (didScroll || attemptCount >= HASH_SCROLL_MAX_ATTEMPTS) {
            return;
        }

        attemptCount += 1;
        window.setTimeout(tryScroll, HASH_SCROLL_RETRY_MS);
    };

    tryScroll();
    return true;
}