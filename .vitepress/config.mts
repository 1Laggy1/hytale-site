import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: "HytaleUA",
  description: "Український сервер Hytale",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Головна', link: '/' },
      { text: '🔮 Підписки', link: '/subscriptions' },
      { text: '⚙️ Керувати підпискою', link: '/cancel' },
      { text: '💖 Підтримати', link: '/support' },
      { text: '🛍️ Магазин', link: '/shop/' },
      { text: 'Discord', link: 'https://discord.gg/JS75DCe9Dk' }
    ],
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/JS75DCe9Dk' }
    ]
  }
})
