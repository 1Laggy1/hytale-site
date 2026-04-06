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
      { text: '🔮 Підписка Amethyst', link: 'https://secure.wayforpay.com/sub/se2b1b37b0968' },
      { text: '⚙️ Керувати підпискою', link: 'https://wayforpay.com/uk' },
      { text: '💖 Підтримати', link: '/support' },
      { text: 'Новини', link: '/news/' },
      { text: 'Discord', link: 'https://discord.gg/JS75DCe9Dk' }
    ],
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/JS75DCe9Dk' }
    ]
  }
})
