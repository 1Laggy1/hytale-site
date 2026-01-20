import { createContentLoader } from 'vitepress'

export default createContentLoader('news/*.md', {
    render: true,
    transform(raw) {
        return raw
        .filter(({ url }) => url !== '/news/')
        .map(({ url, frontmatter, html }) => ({
            title: frontmatter.title || 'Новина без назви',
            url,
            html,
            date: frontmatter.date ? String(frontmatter.date) : '19.01.2026',
                                              image: frontmatter.image || '/logo.png',
                                              tag: frontmatter.tag || 'Новина'
        }))
    }
})
