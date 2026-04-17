---
layout: doc
title: Підтримати проект
---

# 💖 Підтримати HytaleUA

Дякуємо, що граєте на нашому сервері!

Оберіть найзручніший для вас спосіб підтримати розвиток **💛 HytaleUA 💙**:

<br />

<div class="goal-container">
  <div class="goal-stats">
    <span class="goal-current">Зібрано: <strong id="val-current">... грн</strong></span>
    <span class="goal-target">Ціль: <strong id="val-target">1400 грн</strong></span>
  </div>
  <div class="progress-bg">
    <div id="val-bar" class="progress-fill" style="width: 0%;"></div>
  </div>
  <div class="goal-footer">
    Залишилося зібрати: <span id="val-left">... грн</span>
  </div>
</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px; margin-bottom: 40px;">
  <a class="support-btn privat-btn" href="https://www.privat24.ua/send/im6ic" target="_blank">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Конверт ПриватБанк
  </a>
  <a class="support-btn mono-btn" href="https://send.monobank.ua/jar/8RthFf5VhN" target="_blank">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" stroke-width="2"/>
    </svg>
    Банка Monobank
  </a>
</div>

> **Примітка:** Якщо ви хочете отримати унікальний ранг чи переваги, перейдіть до нашої сторінки [🔮 Статуси](/subscriptions). Ця сторінка призначена виключно для добровільних пожертв.

<script>
// Скрипт автоматично підтягує дані з бота
if (typeof window !== 'undefined') {
  fetch('https://shop.hytaleua.com.ua:3000/api/funding')
    .then(response => response.json())
    .then(data => {
      const current = data.currentUAH;
      const target = data.targetUAH;
      const left = target - current > 0 ? target - current : 0;
      let percent = Math.round((current / target) * 100);
      if (percent > 100) percent = 100;

      // Оновлюємо текст
      document.getElementById('val-current').innerText = current + ' грн';
      document.getElementById('val-target').innerText = target + ' грн';
      document.getElementById('val-left').innerText = left + ' грн';

      // Плавна анімація заповнення шкали
      setTimeout(() => {
        document.getElementById('val-bar').style.width = percent + '%';
      }, 400);
    })
    .catch(err => console.error('Не вдалося завантажити дані шкали:', err));
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
</style>
