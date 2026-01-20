#!/bin/bash
echo "🚀 Збірка сайту..."
npm run docs:build

echo "📦 Синхронізація з сервером у Фінляндії..."
rsync -avz --delete .vitepress/dist/ hytale:/var/www/hytaleua_site/

echo "✅ Сайт HytaleUA оновлено!"
