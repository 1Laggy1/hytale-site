---
layout: home

hero:
  name: "💛 HytaleUA 💙"
  text: "Твій шлях у світі Orbis починається тут"
  tagline: "Стабільний сервер, українська локалізація та активна спільнота. Заходь прямо зараз!"
  image:
    src: /logo.png
    alt: Логотип HytaleUA
  actions:
    - theme: brand
      text: Почати грати
      link: /wiki/getting-started
    - theme: alt
      text: "📋 play.hytaleua.com.ua"
      link: "#copy-ip"

features:
  - icon: 🏆
    title: Унікальна система досягнень
    details: Отримуй ексклюзивні ролі та статуси за свою активність!
  - icon: 🛡
    title: Повна безпека
    details: Надійна система привату територій і запису активності. Адміністрація слідкує за безпекою та збереженням ваших домівок!
  - icon: 💵
    title: Глобальна Економіка та Торгівля
    details: Керуйте своїми фінансами з розумом. Продавайте здобуті ресурси, накопичуйте капітал та інвестуйте!
  - icon: 🔄
    title: Найшвидші оновлення
    details: Оновлюємо сервер і плагіни регулярно і швидко, ти будеш грати на найсвіжішому сервері!
  - icon: 🚀
    title: Активна модерація
    details: Оперативна модерація сервера, і виправлення проблем!
  - icon: ⚡
    title: Швидкість та комфорт
    details: Миттєва телепортація та зручна навігація по світу.
  - icon: 🎡
    title: Регулярні івенти
    details: Від паркур-челенджів до масових пригод з унікальними призами!
  - icon: 📍
    title: Неймовірні локації
    details: Місця, які хочеться досліджувати з першої секунди.
  - icon: ⚔
    title: Стабільність
    details: Стабільність понад усе! Регулярні бекапи світу, постійна робота над швидкодією і безпекою сервера! Будьте впевнені, ваш прогрес у надійних руках.
---

<script setup>
import { ref, onMounted } from 'vue'

const current = ref(null)
const target = ref(null)
const left = ref(null)
const percent = ref(0)
const barWidth = ref(0)
const fundError = ref(false)

onMounted(() => {
  const ipButton = document.querySelector('a[href="#copy-ip"]')
  const serverIp = "play.hytaleua.com.ua:15805"

  if (ipButton) {
    ipButton.addEventListener('click', (e) => {
      e.preventDefault() 
      
      navigator.clipboard.writeText(serverIp).then(() => {
        const originalText = ipButton.innerText
        ipButton.innerText = "✅ Скопійовано!"
        ipButton.style.borderColor = "#4caf50"
        
        setTimeout(() => {
          ipButton.innerText = originalText
          ipButton.style.borderColor = ""
        }, 2000)
      })
    })
  }
  
  const widgetContainer = document.getElementById('monicore-widget-container');
  if (widgetContainer && !document.getElementById('monicore-script')) {
    const script = document.createElement('script');
    script.id = 'monicore-script';
    script.src = 'https://monicore.com.ua/static/widget.js';
    script.setAttribute('data-server-id', '430');
    script.async = true;
    widgetContainer.appendChild(script);
  }

  // Шкала фонду розвитку
  fetch('https://shop.hytaleua.com.ua:3000/api/funding')
    .then(response => response.json())
    .then(data => {
      const cur = data.currentUAH
      const tgt = data.targetUAH

      current.value = parseFloat(cur.toFixed(2))
      target.value = tgt
      left.value = parseFloat(Math.max(tgt - cur, 0).toFixed(2))

      let p = Math.round((cur / tgt) * 100)
      if (p > 100) p = 100
      percent.value = p

      setTimeout(() => { barWidth.value = p }, 400)
    })
    .catch(err => {
      fundError.value = true
      console.error('Не вдалося завантажити дані шкали:', err)
    })
})
</script>

<div class="bg-glow">
  <div class="blob blue"></div>
  <div class="blob yellow"></div>
</div>

<section class="fund-section">
  <div class="fund-header">
    <h2 class="fund-title">🚀 Фонд розвитку сервера</h2>
    <p class="fund-subtitle">Дякуємо, що обираєте наш сервер! Збір іде на розширення технічних можливостей та оплату хостингу.</p>
  </div>

  <div class="goal-container">
    <div class="goal-stats">
      <span class="goal-current">Зібрано: <strong>{{ current !== null ? current + ' грн' : (fundError ? '—' : '... грн') }}</strong></span>
      <span class="goal-target">Ціль: <strong>{{ target !== null ? target + ' грн' : '... грн' }}</strong></span>
    </div>
    <div class="progress-bg">
      <div class="progress-fill" :style="{ width: barWidth + '%' }"></div>
      <span class="progress-label" v-if="current !== null">{{ percent }}%</span>
    </div>
    <div class="goal-footer" v-if="!fundError">
      До кінця місяця залишилося зібрати: <span>{{ left !== null ? left + ' грн' : '... грн' }}</span>
    </div>
    <div class="goal-footer" v-else>
      Не вдалося завантажити дані збору. Спробуйте оновити сторінку пізніше.
    </div>
  </div>

  <div class="fund-actions">
    <a class="support-btn mono-btn" href="https://send.monobank.ua/jar/8RthFf5VhN" target="_blank" rel="noopener">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" stroke-width="2"/>
      </svg>
      Долучитися до збору
    </a>
  </div>

  <p class="fund-note">💛 10% від цього збору йдуть на підтримку Збройних Сил України.</p>

<style>
.fund-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 64px;
  position: relative;
  z-index: 1;
}

.fund-header { text-align: center; margin-bottom: 28px; }
.fund-title { margin: 0 0 10px; padding: 0; border: none; font-size: 28px; font-weight: 700; line-height: 1.3; }
.fund-subtitle { margin: 0; color: var(--vp-c-text-2, #ebebf599); font-size: 16px; line-height: 1.6; }

.goal-container {
  background-color: var(--vp-c-bg-soft, #1e1e20);
  border: 1px solid var(--vp-c-divider, #3c3f44);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.goal-stats { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 8px; font-size: 16px; margin-bottom: 16px; }
.goal-current { color: var(--vp-c-text-2, #ebebf599); }
.goal-current strong { color: #ffd700; font-size: 22px; margin-left: 6px; text-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
.goal-target { color: var(--vp-c-text-2, #ebebf599); font-size: 15px; }
.goal-target strong { color: var(--vp-c-text-1, #fff); margin-left: 4px; }

.progress-bg { width: 100%; height: 24px; background-color: #111111; border-radius: 20px; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0,0,0,0.8); position: relative; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #0057b7, #ffd700); border-radius: 20px; transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1); position: absolute; top: 0; left: 0; overflow: hidden; box-shadow: 0 0 15px rgba(255, 215, 0, 0.4); }
.progress-fill::after { content: ''; position: absolute; top: 0; left: 0; bottom: 0; right: -230px; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%); animation: shimmer 3s infinite linear; }
@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
.progress-label { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.7); pointer-events: none; }

.goal-footer { margin-top: 20px; text-align: right; font-size: 14px; color: var(--vp-c-text-2, #888); }
.goal-footer span { color: #4da6ff; font-weight: 700; margin-left: 4px; }

.fund-actions { display: flex; justify-content: center; margin-bottom: 28px; }

.support-btn { display: inline-flex; align-items: center; justify-content: center; gap: 12px; padding: 14px 28px; border-radius: 50px; font-size: 16px; font-weight: 700; text-decoration: none !important; transition: all 0.3s ease; }
.mono-btn { background-color: #1a1a1a; color: white !important; border: 2px solid #1a1a1a; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); }
.mono-btn:hover { background-color: white; color: #1a1a1a !important; border-color: white; transform: translateY(-3px); box-shadow: 0 6px 15px rgba(255, 255, 255, 0.2); }

.fund-note { margin: 8px 0 0; text-align: center; font-size: 14px; line-height: 1.6; color: var(--vp-c-text-2, #888); }
.fund-note a { color: var(--vp-c-brand-1, #4da6ff); font-weight: 600; }

@media (max-width: 640px) {
  .fund-section { padding: 32px 16px 48px; }
  .goal-stats { flex-direction: column; align-items: flex-start; }
  .goal-footer { text-align: left; }
}
</style>
