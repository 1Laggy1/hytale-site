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
// Постійне посилання-запрошення в Discord (https://discord.gg/...). Якщо у віджеті Discord
// вже вказано канал для запрошення — можна залишити порожнім.
const DISCORD_INVITE_FALLBACK = ''
// Скріншоти: поклади файли в папку public/screens/ і впиши імена, напр. ['spawn.jpg', 'castle.jpg']
const screenshots = []

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

// ====== ОНЛАЙН СЕРВЕРА ======
const server = ref(null)
const serverError = ref(false)
const serverText = computed(() => {
  if (server.value) return `${server.value.online} / ${server.value.max}`
  return serverError.value ? '—' : '...'
})

async function loadServer() {
  try {
    const r = await fetch(`https://monicore.com.ua/api/servers/server/${MONICORE_SERVER_ID}/widget/`)
    if (!r.ok) throw new Error(r.status)
    const d = await r.json()
    server.value = { online: Number(d.online || 0), max: Number(d.max || 0), isOnline: !!d.is_online }
    serverError.value = false
  } catch (e) {
    serverError.value = true
  }
}

// ====== ОНЛАЙН DISCORD ======
const discord = ref(null)
const discordError = ref(false)
const discordText = computed(() => {
  if (discord.value) return String(discord.value.online)
  return discordError.value ? '—' : '...'
})
const discordLink = computed(() => (discord.value && discord.value.invite) || DISCORD_INVITE_FALLBACK)

async function loadDiscord() {
  try {
    const r = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`)
    if (!r.ok) throw new Error(r.status)
    const d = await r.json()
    discord.value = { online: Number(d.presence_count || 0), invite: d.instant_invite || '' }
    discordError.value = false
  } catch (e) {
    discordError.value = true
  }
}

// ====== КОПІЮВАННЯ IP ======
const copied = ref(false)
function copyIp() {
  navigator.clipboard.writeText(SERVER_IP).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
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

let timer = null

onMounted(() => {
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

  loadServer()
  loadDiscord()
  loadFund()
  // Оновлюємо онлайн раз на хвилину
  timer = setInterval(() => { loadServer(); loadDiscord() }, 60000)
})

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<div class="bg-glow">
  <div class="blob blue"></div>
  <div class="blob yellow"></div>
</div>

<section class="hua-stats">
  <div class="hua-stat-card">
    <div class="hua-stat-head"><span class="hua-dot" :class="{ on: server && server.isOnline, off: server && !server.isOnline }"></span>Ігровий сервер</div>
    <div class="hua-stat-value">{{ serverText }}</div>
    <div class="hua-stat-sub">гравців онлайн</div>
    <button class="hua-btn hua-btn-gold" type="button" @click="copyIp">{{ copied ? '✅ Скопійовано!' : '📋 play.hytaleua.com.ua' }}</button>
  </div>
  <div class="hua-stat-card">
    <div class="hua-stat-head"><span class="hua-dot" :class="{ on: discord }"></span>Discord спільнота</div>
    <div class="hua-stat-value">{{ discordText }}</div>
    <div class="hua-stat-sub">учасників онлайн</div>
    <a v-if="discordLink" class="hua-btn hua-btn-blue" :href="discordLink" target="_blank" rel="noopener">💬 Приєднатися до Discord</a>
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

<section class="hua-section" v-if="screenshots.length">
  <h2 class="hua-title">Наш <span>світ</span></h2>
  <p class="hua-lead">Трохи кадрів з Orbis.</p>
  <div class="hua-gallery">
    <img v-for="s in screenshots" :key="s" :src="'/screens/' + s" alt="Скріншот сервера HytaleUA" loading="lazy" />
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
    <a class="support-btn mono-btn" href="https://send.monobank.ua/jar/8RthFf5VhN" target="_blank" rel="noopener">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" stroke-width="2"/>
      </svg>
      Долучитися до збору
    </a>
  </div>
</section>

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
.hua-stats, .hua-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}
.hua-section { padding-top: 56px; }
.hua-title { margin: 0; padding: 0; border: none; text-align: center; font-size: 30px; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.hua-title span { background: linear-gradient(120deg, #3d9bff, #ffd700); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hua-lead { margin: 10px 0 32px; text-align: center; color: var(--vp-c-text-2); font-size: 16px; }

/* ---------- Онлайн ---------- */
.hua-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding-top: 16px; }
.hua-stat-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 24px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  transition: transform .25s ease, border-color .25s ease;
}
.hua-stat-card:hover { transform: translateY(-3px); border-color: rgba(255, 215, 0, 0.45); }
.hua-stat-head { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; color: var(--vp-c-text-2); text-transform: uppercase; letter-spacing: .06em; }
.hua-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--vp-c-text-3); }
.hua-dot.on { background: #3ddc84; box-shadow: 0 0 0 0 rgba(61, 220, 132, .6); animation: hua-pulse 2s infinite; }
.hua-dot.off { background: #ff5252; }
@keyframes hua-pulse { 70% { box-shadow: 0 0 0 9px rgba(61, 220, 132, 0); } 100% { box-shadow: 0 0 0 0 rgba(61, 220, 132, 0); } }
.hua-stat-value { margin-top: 8px; font-size: 44px; font-weight: 800; line-height: 1.1; color: var(--vp-c-text-1); }
.hua-stat-sub { color: var(--vp-c-text-2); font-size: 14px; margin-bottom: 14px; }
.hua-btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 20px; border-radius: 50px; font-size: 14px; font-weight: 700; text-decoration: none !important; cursor: pointer; border: 2px solid transparent; transition: all .25s ease; }
.hua-btn:hover { transform: translateY(-2px); }
.hua-btn-gold { background: rgba(255, 215, 0, 0.12); color: #ffd700; border-color: rgba(255, 215, 0, 0.45); }
.hua-btn-gold:hover { background: #ffd700; color: #1a1a1a; }
.hua-btn-blue { background: #5865f2; color: #fff !important; }
.hua-btn-blue:hover { background: #4752c4; }

/* ---------- Features ---------- */
.hua-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.hua-feature {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 24px;
  transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.hua-feature:hover { transform: translateY(-4px); border-color: rgba(61, 155, 255, 0.5); box-shadow: 0 12px 32px rgba(0, 87, 183, 0.22); }
.hua-feature-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 24px; border-radius: 14px; margin-bottom: 14px; background: linear-gradient(135deg, rgba(0, 87, 183, .35), rgba(255, 215, 0, .25)); }
.hua-feature h3 { margin: 0 0 8px; padding: 0; font-size: 17px; font-weight: 700; line-height: 1.4; }
.hua-feature p { margin: 0; color: var(--vp-c-text-2); font-size: 14px; line-height: 1.65; }

/* ---------- Галерея ---------- */
.hua-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.hua-gallery img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 14px; border: 1px solid var(--vp-c-divider); transition: transform .25s ease; }
.hua-gallery img:hover { transform: scale(1.02); }

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
@media (max-width: 640px) {
  .hua-stats { grid-template-columns: 1fr; }
  .hua-features { grid-template-columns: 1fr; }
  .hua-section { padding-top: 40px; }
  .hua-title { font-size: 26px; }
  .fund-section { padding: 48px 16px; }
  .goal-stats { flex-direction: column; align-items: flex-start; }
  .goal-footer { text-align: left; }
}
</style>
