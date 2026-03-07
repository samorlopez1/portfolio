export type Page = 'home' | 'gallery' | 'case-study'

export const routes = {
    home: { path: '/', page: 'home' as const },
    gallery: { path: '/play', page: 'gallery' as const },
    caseStudy: { path: '/:id', page: 'case-study' as const },
} as const
