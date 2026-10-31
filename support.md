---
layout: doc
title: Підтримати проект
---

<br />

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

> **Примітка:** Якщо ви хочете отримати унікальний ранг чи переваги, перейдіть до нашої сторінки [🔮 Статуси](/subscriptions). Ця сторінка призначена виключно для добровільних пожертв.

<div class="hua-top">
  <h3 class="hua-top-title">🏅 Топ пожертв місяця</h3>
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
</div>

<script setup>
import { ref, onMounted } from 'vue'

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

      // Плавна анімація заповнення шкали
      setTimeout(() => { barWidth.value = p }, 400)
    })
    .catch(err => {
      fundError.value = true
      console.error('Не вдалося завантажити дані шкали:', err)
    })
}

// ====== ТОП ПОЖЕРТВ ======
const TOP_LIMIT = 10 // скільки записів показуємо (максимум на боці бота — 20)
const topDonations = ref([])
const topLoaded = ref(false)
const topError = ref(false)
const medals = ['🥇', '🥈', '🥉']

function loadTop() {
  fetch(`https://shop.hytaleua.com.ua:3000/api/top-donations?limit=${TOP_LIMIT}`)
    .then(r => r.json())
    .then(data => {
      const list = Array.isArray(data) ? data : (data.donations || [])
      topDonations.value = list
        .map(d => ({ amount: parseFloat((Number(d.amount) || 0).toFixed(2)), comment: (d.comment || '').trim() }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, TOP_LIMIT)
    })
    .catch(err => {
      topError.value = true
      console.error('Не вдалося завантажити топ пожертв:', err)
    })
    .finally(() => { topLoaded.value = true })
}

onMounted(() => {
  loadFund()
  loadTop()
})
</script>

<style>
/* ==========================================
   СУПЕР-КРАСИВА ШКАЛА ПРОГРЕСУ (ЖОВТО-СИНЯ)
   ========================================== */
.goal-container {
  background-color: var(--vp-c-bg-soft, #1e1e20);
  border: 1px solid var(--vp-c-divider, #3c3f44);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.goal-stats {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 16px;
  margin-bottom: 16px;
}

.goal-current {
  color: var(--vp-c-text-2, #ebebf599);
}

.goal-current strong {
  color: #ffd700; /* Яскравий український жовтий */
  font-size: 22px;
  margin-left: 6px;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.goal-target {
  color: var(--vp-c-text-2, #ebebf599);
  font-size: 15px;
}

.goal-target strong {
  color: var(--vp-c-text-1, #fff);
  margin-left: 4px;
}

.progress-bg {
  width: 100%;
  height: 24px;
  background-color: #111111;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.8);
  position: relative; /* Додано для правильної роботи shimmer */
}

.progress-fill {
  height: 100%;
  /* Розкішний жовто-синій градієнт */
  background: linear-gradient(90deg, #0057b7, #ffd700);
  border-radius: 20px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute; /* Змінено на absolute */
  top: 0;
  left: 0;
  /* Жовте світіння навколо шкали */
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}

/* Ефект живого переливання (shimmer) */
.progress-fill::after {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0; right: -230px; /* Збільшено відступ справа для плавного розчинення */
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
  animation: shimmer 3s infinite linear; /* Змінено easing для більшої плавності */
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.goal-footer {
  margin-top: 35px; /* Збільшено відступ через абсолютне позиціонування шкали */
  text-align: right;
  font-size: 14px;
  color: var(--vp-c-text-2, #888);
}

.goal-footer span {
  color: #4da6ff; /* Приємний блакитний для залишку, щоб гарно читався на темному */
  font-weight: 700;
  margin-left: 4px;
}

/* ==========================================
   СТИЛІ КНОПОК
   ========================================== */
.support-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none !important;
  transition: all 0.3s ease;
}

.privat-btn {
  background-color: #70b33b;
  color: white !important;
  border: 2px solid #70b33b;
  box-shadow: 0 4px 15px rgba(112, 179, 59, 0.3);
}
.privat-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(112, 179, 59, 0.5);
  background-color: #7fc744;
  border-color: #7fc744;
}

.mono-btn {
  background-color: #1a1a1a;
  color: white !important;
  border: 2px solid #1a1a1a;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.mono-btn:hover {
  background-color: white;
  color: #1a1a1a !important;
  border-color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.2);
}

/* ==========================================
   ТОП ПОЖЕРТВ
   ========================================== */
.hua-top { margin: 28px 0 8px; }
.hua-top-title { margin: 0 0 14px; padding: 0; border: none; font-size: 20px; font-weight: 700; }
.hua-top-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.hua-top-item { display: flex; align-items: flex-start; gap: 14px; padding: 12px 16px; border-radius: 14px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.hua-top-rank { flex: 0 0 28px; text-align: center; font-size: 22px; line-height: 1.4; font-weight: 700; color: var(--vp-c-text-2); }
.hua-top-body { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.hua-top-amount { color: #ffd700; font-size: 17px; }
.hua-top-comment { font-size: 14px; line-height: 1.5; color: var(--vp-c-text-2); overflow-wrap: anywhere; }
.hua-top-empty { margin: 0; text-align: center; font-size: 14px; color: var(--vp-c-text-2); }

</style>
