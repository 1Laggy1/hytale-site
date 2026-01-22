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
      { text: '🔮 Магазин', link: 'https://shop.hytaleua.com.ua/' },
      { text: 'Новини', link: '/news/' },
      { text: 'Discord', link: 'https://discord.gg/JS75DCe9Dk' }
    ],
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/JS75DCe9Dk' }
    ]
  }
})
