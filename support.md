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
  <ol id="top-list" class="hua-top-list"></ol>
  <p id="top-empty" class="hua-top-empty">Завантаження...</p>
</div>

<script>
// Скрипт автоматично підтягує дані з бота
if (typeof window !== 'undefined') {
  fetch('https://shop.hytaleua.com.ua:3000/api/funding')
    .then(response => response.json())
    .then(data => {
      const current = data.currentUAH;
      const target = data.targetUAH;
      
      // ВИПРАВЛЕНО: Додано parseFloat та .toFixed(2) для правильного округлення копійок
      let left = target - current > 0 ? target - current : 0;
      left = parseFloat(left.toFixed(2));
      
      let percent = Math.round((current / target) * 100);
      if (percent > 100) percent = 100;

      // Оновлюємо текст (можна також округлити current, про всяк випадок)
      document.getElementById('val-current').innerText = parseFloat(current.toFixed(2)) + ' грн';
      document.getElementById('val-target').innerText = target + ' грн';
      document.getElementById('val-left').innerText = left + ' грн';
      // Плавна анімація заповнення шкали
      setTimeout(() => {
        document.getElementById('val-bar').style.width = percent + '%';
      }, 400);
    })
    .catch(err => console.error('Не вдалося завантажити дані шкали:', err));
    // ====== ТОП ПОЖЕРТВ ======
  fetch('https://shop.hytaleua.com.ua:3000/api/top-donations?limit=10')
    .then(response => response.json())
    .then(list => {
      const listEl = document.getElementById('top-list');
      const emptyEl = document.getElementById('top-empty');
      if (!Array.isArray(list) || list.length === 0) {
        emptyEl.innerText = 'Поки що порожньо. Будь першим!';
        return;
      }
      emptyEl.style.display = 'none';
      const medals = ['🥇', '🥈', '🥉'];
      list.forEach((d, i) => {
        const li = document.createElement('li');
        li.className = 'hua-top-item';

        const rank = document.createElement('span');
        rank.className = 'hua-top-rank';
        rank.textContent = medals[i] || String(i + 1);

        const body = document.createElement('div');
        body.className = 'hua-top-body';

        const amount = document.createElement('strong');
        amount.className = 'hua-top-amount';
        amount.textContent = parseFloat(Number(d.amount).toFixed(2)) + ' грн';
        body.appendChild(amount);

        if (d.comment) {
          const comment = document.createElement('span');
          comment.className = 'hua-top-comment';
          comment.textContent = d.comment; // textContent, а не innerHTML: коментарі не можуть вставити HTML
          body.appendChild(comment);
        }

        li.appendChild(rank);
        li.appendChild(body);
        listEl.appendChild(li);
      });
    })
    .catch(err => {
      document.getElementById('top-empty').innerText = 'Не вдалося завантажити';
      console.error('Не вдалося завантажити топ пожертв:', err);
    });
}
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
