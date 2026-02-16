import categories from "./data.json"
export const getCategoryBySlug = (slug: string) => categories.find(cat => cat.slug === slug)