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
---

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ====== НАЛАШТУВАННЯ ======
const SERVER_IP = 'play.hytaleua.com.ua:15805'
const MONICORE_SERVER_ID = 430
const DISCORD_GUILD_ID = '1461345250189508801'
// Постійне посилання-запрошення (https://discord.gg/...). Кнопка «Приєднатися» з'явиться під віджетом.
// Якщо в налаштуваннях Discord (Widget → Invite channel) вибрано канал, посилання підтягнеться саме.
const DISCORD_INVITE = 'https://discord.gg/XZrn7xQC8Y'
// Скріншоти: поклади файли в папку public/screens/ і впиши імена, напр. ['spawn.jpg', 'castle.jpg']
const screenshots = [ '1.png', '2.png', '3.png', '4.jpg', '5.jpg', '6.jpg', '7.jpg' ]

const features = [
  { icon: '🏆', title: 'Унікальна система досягнень', details: 'Отримуй ексклюзивні ролі та статуси за свою активність!' },
  { icon: '🛡', title: 'Повна безпека', details: 'Надійна система привату територій і запису активності. Адміністрація слідкує за безпекою та збереженням ваших домівок!' },
  { icon: '💵', title: 'Глобальна Економіка та Торгівля', details: 'Керуйте своїми фінансами з розумом. Продавайте здобуті ресурси, накопичуйте капітал та інвестуйте!' },
  { icon: '🔄', title: 'Найшвидші оновлення', details: 'Оновлюємо сервер і плагіни регулярно і швидко, ти будеш грати на найсвіжішому сервері!' },
  { icon: '🚀', title: 'Активна модерація', details: 'Оперативна модерація сервера, і виправлення проблем!' },
  { icon: '⚡', title: 'Швидкість та комфорт', details: 'Миттєва телепортація та зручна навігація по світу.' },
  { icon: '🎡', title: 'Регулярні івенти', details: 'Від паркур-челенджів до масових пригод з унікальними призами!' },
  { icon: '📍', title: 'Неймовірні локації', details: 'Місця, які хочеться досліджувати з першої секунди.' },
  { icon: '⚔', title: 'Стабільність', details: 'Стабільність понад усе! Регулярні бекапи світу, постійна робота над швидкодією і безпекою сервера! Будьте впевнені, ваш прогрес у надійних руках.' }
]

// ====== DISCORD (офіційний віджет, тема підлаштовується під сайт) ======
const discordTheme = ref('dark')
const discordSrc = computed(() => `https://discord.com/widget?id=${DISCORD_GUILD_ID}&theme=${discordTheme.value}`)
const discordAutoInvite = ref('')
const discordLink = computed(() => DISCORD_INVITE || discordAutoInvite.value)

async function loadDiscordInvite() {
  try {
    const r = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`)
    if (!r.ok) return
    const d = await r.json()
    discordAutoInvite.value = d.instant_invite || ''
  } catch (e) { /* без посилання кнопка просто не покажеться */ }
}

// ====== КОПІЮВАННЯ IP ======
const copied = ref(false)
function copyIp() {
  navigator.clipboard.writeText(SERVER_IP).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

// ====== СЛАЙДЕР СКРІНШОТІВ ======
const AUTOPLAY_MS = 5000
const slide = ref(0)
const maxSeen = ref(0)
const paused = ref(false)
let autoTimer = null
let touchX = null

// Підвантажуємо поточний слайд, наступний і останній (для кнопки «назад» з першого), решту — коли дійдемо
const shouldLoad = (i) => i <= maxSeen.value + 1 || i === screenshots.length - 1

function setSlide(i) {
  const n = screenshots.length
  slide.value = ((i % n) + n) % n
  if (slide.value > maxSeen.value) maxSeen.value = slide.value
}
function stopAuto() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null }
}
function startAuto() {
  stopAuto()
  if (screenshots.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  autoTimer = setInterval(() => {
    if (!paused.value && !document.hidden) setSlide(slide.value + 1)
  }, AUTOPLAY_MS)
}
// Ручне перемикання теж скидає таймер, щоб слайд не змінився одразу після кліку
function go(i) { setSlide(i); startAuto() }
function next() { go(slide.value + 1) }
function prev() { go(slide.value - 1) }

function onTouchStart(e) { touchX = e.touches[0].clientX; paused.value = true }
function onTouchEnd(e) {
  paused.value = false
  if (touchX === null) return
  const dx = e.changedTouches[0].clientX - touchX
  touchX = null
  if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
}

// ====== ФОНД РОЗВИТКУ ======
const current = ref(null)
const target = ref(null)
const left = ref(null)
const percent = ref(0)
const barWidth = ref(0)
const fundError = ref(false)

function loadFund() {
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
}

// ====== ТОП ПОЖЕРТВ ======
const topDonations = ref([])
const topLoaded = ref(false)
const topError = ref(false)
const medals = ['🥇', '🥈', '🥉']

function loadTop() {
  fetch('https://shop.hytaleua.com.ua:3000/api/top-donations')
    .then(r => r.json())
    .then(data => {
      const list = Array.isArray(data) ? data : (data.donations || [])
      topDonations.value = list
        .map(d => ({ amount: Number(d.amount) || 0, comment: (d.comment || '').trim() }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)
    })
    .catch(err => {
      topError.value = true
      console.error('Не вдалося завантажити топ пожертв:', err)
    })
    .finally(() => { topLoaded.value = true })
}

let observer = null

onMounted(() => {
  loadFund()
  loadTop()
  // Кнопка копіювання IP у hero
  const ipButton = document.querySelector('a[href="#copy-ip"]')
  if (ipButton) {
    ipButton.addEventListener('click', (e) => {
      e.preventDefault()
      navigator.clipboard.writeText(SERVER_IP).then(() => {
        const originalText = ipButton.innerText
        ipButton.innerText = '✅ Скопійовано!'
        ipButton.style.borderColor = '#4caf50'
        setTimeout(() => {
          ipButton.innerText = originalText
          ipButton.style.borderColor = ''
        }, 2000)
      })
    })
  }

  // Тема Discord-віджета слідує за темою сайту
  const html = document.documentElement
  const syncTheme = () => { discordTheme.value = html.classList.contains('dark') ? 'dark' : 'light' }
  syncTheme()
  observer = new MutationObserver(syncTheme)
  observer.observe(html, { attributes: true, attributeFilter: ['class'] })

  // Офіційний віджет Monicore (показує статус і онлайн сервера)
  const widgetContainer = document.getElementById('monicore-widget-container')
  if (widgetContainer && widgetContainer.childElementCount === 0) {
    const script = document.createElement('script')
    script.src = 'https://monicore.com.ua/static/widget.js'
    script.setAttribute('data-server-id', String(MONICORE_SERVER_ID))
    script.async = true
    widgetContainer.appendChild(script)
  }

  loadDiscordInvite()
  loadFund()
  startAuto()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  stopAuto()
})
</script>

<div class="bg-glow">
  <div class="blob blue"></div>
  <div class="blob yellow"></div>
</div>

<section class="hua-side">
  <div class="hua-card hua-server">
    <div id="monicore-widget-container" class="hua-monicore"></div>
    <button class="hua-btn hua-btn-gold" type="button" @click="copyIp">{{ copied ? '✅ Скопійовано!' : '📋 play.hytaleua.com.ua' }}</button>
    <a class="hua-link" href="/wiki/getting-started">Як приєднатися →</a>
  </div>
  <div class="hua-card hua-discord">
    <iframe :src="discordSrc" title="Discord HytaleUA" width="100%" height="480" allowtransparency="true" frameborder="0" loading="lazy" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    <a v-if="discordLink" class="hua-discord-join" :href="discordLink" target="_blank" rel="noopener">💬 Приєднатися до Discord</a>
  </div>
</section>



<section class="hua-section" v-if="screenshots.length">
  <h2 class="hua-title">Наш <span>світ</span></h2>
  <p class="hua-lead">Трохи кадрів з HytaleUA.</p>
  <div class="hua-slider" role="region" aria-roledescription="carousel" aria-label="Скріншоти сервера HytaleUA" tabindex="0" @mouseenter="paused = true" @mouseleave="paused = false" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd" @keydown.left.prevent="prev" @keydown.right.prevent="next">
    <div class="hua-slide" v-for="(s, i) in screenshots" :key="s" :class="{ active: i === slide }" :aria-hidden="i !== slide">
      <img :src="shouldLoad(i) ? '/screens/' + s : undefined" :alt="'Скріншот сервера HytaleUA ' + (i + 1)" draggable="false" />
    </div>
    <template v-if="screenshots.length > 1">
      <button class="hua-slider-btn prev" type="button" aria-label="Попередній кадр" @click="prev">‹</button>
      <button class="hua-slider-btn next" type="button" aria-label="Наступний кадр" @click="next">›</button>
      <div class="hua-slider-bar">
        <div class="hua-slider-dots">
          <button v-for="(s, i) in screenshots" :key="s" class="hua-sdot" :class="{ active: i === slide }" type="button" :aria-label="'Кадр ' + (i + 1)" @click="go(i)"></button>
        </div>
        <span class="hua-slider-counter">{{ slide + 1 }} / {{ screenshots.length }}</span>
      </div>
    </template>
  </div>
</section>

<section class="hua-section">
  <h2 class="hua-title">Чому <span>HytaleUA</span></h2>
  <p class="hua-lead">Все, що потрібно для комфортної гри з друзями, в одному місці.</p>
  <div class="hua-features">
    <article class="hua-feature" v-for="f in features" :key="f.title">
      <div class="hua-feature-icon">{{ f.icon }}</div>
      <h3>{{ f.title }}</h3>
      <p>{{ f.details }}</p>
    </article>
  </div>
</section>

<section class="fund-section">
  <div class="fund-header">
    <h2 class="fund-title">🚀 Фонд розвитку сервера</h2>
    <p class="fund-subtitle">Дякуємо, що обираєте наш сервер! Збір іде на розширення технічних можливостей та оплату хостингу. Також 15% йдуть на підтримку Збройних Сил України 🇺🇦</p>
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
    <a class="support-btn mono-btn" href="https://send.monobank.ua/jar/4YydajW9HL" target="_blank" rel="noopener">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" stroke-width="2"/>
      </svg>
      Долучитися до збору
    </a>
  </div>

<div class="hua-top">
      <h3 class="hua-top-title">🏅 Топ пожертв</h3>
      <ol v-if="topDonations.length" class="hua-top-list">
        <li v-for="(d, i) in topDonations" :key="i" class="hua-top-item">
          <span class="hua-top-rank">{{ medals[i] || (i + 1) }}</span>
          <div class="hua-top-body">
            <strong class="hua-top-amount">{{ d.amount }} грн</strong>
            <span v-if="d.comment" class="hua-top-comment">{{ d.comment }}</span>
          </div>
        </li>
      </ol>
      <p v-else class="hua-top-empty">{{ !topLoaded ? 'Завантаження...' : (topError ? 'Не вдалося завантажити' : 'Поки що порожньо. Будь першим!') }}</p>
</div></section>

<style>
/* ---------- Hero ---------- */
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #3d9bff 20%, #ffd700 80%);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #0057b7 45%, #ffd700 55%);
  --vp-home-hero-image-filter: blur(64px);
}
.VPHome .VPHero .text { text-wrap: balance; }
.VPHome .VPHero .tagline { max-width: 560px; }

/* ---------- Спільне ---------- */
.hua-section { max-width: 1152px; margin: 0 auto; padding: 56px 24px 0; position: relative; z-index: 1; }
.hua-title { margin: 0; padding: 0; border: none; text-align: center; font-size: 30px; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.hua-title span { background: linear-gradient(120deg, #3d9bff, #ffd700); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hua-lead { margin: 10px 0 32px; text-align: center; color: var(--vp-c-text-2); font-size: 16px; }

.hua-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
}

/* ---------- Бічні блоки: сервер + Discord ----------
   Широкий екран (≥1840px): зліва сервер, справа Discord, не займають місце в контенті.
   Вужчий екран: два блоки в ряд під hero. */
.hua-side {
  max-width: 1152px; margin: 0 auto; padding: 16px 24px 0;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; align-items: stretch;
  position: relative; z-index: 1;
}
.hua-server { padding: 22px; display: flex; flex-direction: column; gap: 14px; }
.hua-monicore { width: 100%; }
.hua-monicore > div { max-width: 100% !important; margin: 0 auto; }

.hua-btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 20px; border-radius: 50px; font-size: 14px; font-weight: 700; text-decoration: none !important; cursor: pointer; border: 2px solid transparent; transition: all .25s ease; }
.hua-btn:hover { transform: translateY(-2px); }
.hua-btn-gold { background: rgba(255, 215, 0, 0.12); color: #ffd700; border-color: rgba(255, 215, 0, 0.45); }
.hua-btn-gold:hover { background: #ffd700; color: #1a1a1a; }
.hua-link { font-size: 14px; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none; text-align: center; }
.hua-link:hover { text-decoration: underline; }

/* ---------- Топ пожертв ---------- */
.hua-top { border-top: 1px solid var(--vp-c-divider); padding-top: 14px; }
.hua-top-title { margin: 0 0 10px; padding: 0; font-size: 15px; font-weight: 700; text-align: center; }
.hua-top-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.hua-top-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px 10px; border-radius: 12px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.hua-top-rank { flex: 0 0 24px; text-align: center; font-size: 18px; line-height: 1.4; font-weight: 700; color: var(--vp-c-text-2); }
.hua-top-body { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.hua-top-amount { color: #ffd700; font-size: 15px; }
.hua-top-comment { font-size: 13px; line-height: 1.45; color: var(--vp-c-text-2); overflow-wrap: anywhere; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.hua-top-empty { margin: 0; text-align: center; font-size: 13px; color: var(--vp-c-text-2); }

.hua-discord { overflow: hidden; padding: 0; }
.hua-discord iframe { display: block; width: 100%; height: 480px; border: 0; }
.hua-discord-join { display: block; padding: 14px; text-align: center; font-size: 15px; font-weight: 700; color: #fff !important; background: #5865f2; text-decoration: none !important; transition: background .25s ease; }
.hua-discord-join:hover { background: #4752c4; }

@media (min-width: 1840px) {
  .hua-side { display: block; padding: 0; max-width: none; margin: 0; }
  /* По центру по вертикалі (враховуючи шапку сайту 64px) */
  .hua-server, .hua-discord { position: fixed; top: calc(50% + 32px); transform: translateY(-50%); width: 300px; z-index: 10; }
  .hua-server { left: calc(50% - 900px); }
  .hua-discord { left: calc(50% + 600px); }
}

/* ---------- Features ---------- */
.hua-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.hua-feature { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 18px; padding: 24px; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
.hua-feature:hover { transform: translateY(-4px); border-color: rgba(61, 155, 255, 0.5); box-shadow: 0 12px 32px rgba(0, 87, 183, 0.22); }
.hua-feature-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 24px; border-radius: 14px; margin-bottom: 14px; background: linear-gradient(135deg, rgba(0, 87, 183, .35), rgba(255, 215, 0, .25)); }
.hua-feature h3 { margin: 0 0 8px; padding: 0; font-size: 17px; font-weight: 700; line-height: 1.4; }
.hua-feature p { margin: 0; color: var(--vp-c-text-2); font-size: 14px; line-height: 1.65; }

/* ---------- Слайдер скріншотів ---------- */
.hua-slider { position: relative; width: 100%; aspect-ratio: 16 / 9; max-height: 72vh; overflow: hidden; border-radius: 20px; border: 1px solid var(--vp-c-divider); background: #0d0d10; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35); outline: none; user-select: none; }
.hua-slider:focus-visible { box-shadow: 0 0 0 3px rgba(61, 155, 255, 0.6), 0 16px 48px rgba(0, 0, 0, 0.35); }
.hua-slide { position: absolute; inset: 0; opacity: 0; transform: scale(1.03); transition: opacity .8s ease, transform 1.2s ease; pointer-events: none; }
.hua-slide.active { opacity: 1; transform: scale(1); pointer-events: auto; }
.hua-slide img { display: block; width: 100%; height: 100%; object-fit: cover; }
.hua-slider::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 90px; background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent); pointer-events: none; }

.hua-slider-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.25); background: rgba(0, 0, 0, 0.45); color: #fff; font-size: 28px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0 0 4px; backdrop-filter: blur(6px); transition: background .25s ease, transform .25s ease, opacity .25s ease; opacity: 0.85; }
.hua-slider-btn:hover { background: rgba(0, 0, 0, 0.75); opacity: 1; transform: translateY(-50%) scale(1.08); }
.hua-slider-btn.prev { left: 16px; }
.hua-slider-btn.next { right: 16px; }

.hua-slider-bar { position: absolute; left: 0; right: 0; bottom: 14px; z-index: 2; display: flex; align-items: center; justify-content: center; padding: 0 20px; }
.hua-slider-dots { display: flex; gap: 8px; }
.hua-sdot { width: 9px; height: 9px; padding: 0; border-radius: 50%; border: none; background: rgba(255, 255, 255, 0.45); cursor: pointer; transition: all .3s ease; }
.hua-sdot:hover { background: rgba(255, 255, 255, 0.8); }
.hua-sdot.active { width: 26px; border-radius: 8px; background: #ffd700; }
.hua-slider-counter { position: absolute; right: 20px; font-size: 13px; font-weight: 700; color: rgba(255, 255, 255, 0.85); text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7); }

@media (max-width: 640px) {
  .hua-slider { border-radius: 14px; max-height: none; }
  .hua-slider-btn { width: 36px; height: 36px; font-size: 22px; }
  .hua-slider-btn.prev { left: 8px; }
  .hua-slider-btn.next { right: 8px; }
  .hua-slider-counter { display: none; }
}

/* ---------- Фонд розвитку ---------- */
.fund-section { max-width: 960px; margin: 0 auto; padding: 64px 24px 64px; position: relative; z-index: 1; }
.fund-header { text-align: center; margin-bottom: 28px; }
.fund-title { margin: 0 0 10px; padding: 0; border: none; font-size: 28px; font-weight: 700; line-height: 1.3; }
.fund-subtitle { margin: 0; color: var(--vp-c-text-2, #ebebf599); font-size: 16px; line-height: 1.6; }

.goal-container { background-color: var(--vp-c-bg-soft, #1e1e20); border: 1px solid var(--vp-c-divider, #3c3f44); border-radius: 16px; padding: 24px; margin-bottom: 28px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); }
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

.fund-actions { display: flex; justify-content: center; }
.support-btn { display: inline-flex; align-items: center; justify-content: center; gap: 12px; padding: 14px 28px; border-radius: 50px; font-size: 16px; font-weight: 700; text-decoration: none !important; transition: all 0.3s ease; }
.mono-btn { background-color: #1a1a1a; color: white !important; border: 2px solid #1a1a1a; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); }
.mono-btn:hover { background-color: white; color: #1a1a1a !important; border-color: white; transform: translateY(-3px); box-shadow: 0 6px 15px rgba(255, 255, 255, 0.2); }

/* ---------- Адаптив ---------- */
@media (max-width: 960px) {
  .hua-features { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .hua-side { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .hua-features { grid-template-columns: 1fr; }
  .hua-section { padding-top: 40px; }
  .hua-title { font-size: 26px; }
  .fund-section { padding: 48px 16px; }
  .goal-stats { flex-direction: column; align-items: flex-start; }
  .goal-footer { text-align: left; }
}
</style>
