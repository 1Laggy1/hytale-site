---
layout: page
title: Підписки
---

<div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: sans-serif;">
  <div style="text-align: center; margin-bottom: 50px;">
    <h1 style="font-size: 48px; font-weight: 800; color: var(--vp-c-text-1); margin-bottom: 10px;">Оберіть свій статус</h1>
    <p style="font-size: 18px; color: var(--vp-c-text-2);">Підтримайте розвиток HytaleUA та отримайте унікальні можливості</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
    <div class="sub-card sub-card-quartz" style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 24px; padding: 40px; text-align: center; transition: all 0.4s ease-out; position: relative; overflow: visible;">
      <img src="/quartz.png" alt="Quartz Rank" style="width: 100px; height: 100px; margin: 0 auto 20px; display: block; border-radius: 16px; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" />
      <h2 style="font-size: 28px; margin-bottom: 10px; color: var(--vp-c-text-1);">QUARTZ</h2>
      <div style="font-size: 32px; font-weight: bold; color: #6c757d; margin-bottom: 25px;">50 грн <span style="font-size: 16px; font-weight: normal; color: var(--vp-c-text-2);">/ міс</span></div>
      <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 40px; color: var(--vp-c-text-2); font-size: 15px; line-height: 2;">
        <li>✅ Зміна кольору нікнейму <b>/namecolor</b></li>
        <li>✅ +2 точки <b>/home</b></li>
        <li>✅ Пріоритетний вхід на сервер</li>
        <li>✅ Унікальна роль в Discord Quartz</li>
      </ul>
      <button @click="openModal('quartz')" class="sub-button" style="width: 100%; border: none; cursor: pointer; display: block; background: #6c757d; color: white; padding: 15px; border-radius: 12px; font-weight: bold;">Підписатись</button>
    </div>
    <div class="sub-card active" style="background: var(--vp-c-bg-soft); border: 2px solid #bd00ed; border-radius: 24px; padding: 40px; text-align: center; transition: all 0.4s ease-out; position: relative; transform: scale(1.05); overflow: visible;">
      <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #bd00ed; color: white; padding: 5px 20px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Популярно</div>
      <img src="/amethyst.png" alt="Amethyst Rank" style="width: 100px; height: 100px; margin: 0 auto 20px; display: block; border-radius: 16px; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" />
      <h2 style="font-size: 28px; margin-bottom: 10px; color: var(--vp-c-text-1);">AMETHYST</h2>
      <div style="font-size: 32px; font-weight: bold; color: #bd00ed; margin-bottom: 25px;">180 грн <span style="font-size: 16px; font-weight: normal; color: var(--vp-c-text-2);">/ міс</span></div>
      <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 40px; color: var(--vp-c-text-2); font-size: 15px; line-height: 2;">
        <li>✅ Все, що є в <b>Quartz</b></li>
        <li>✅ Зміна префіксу <b>/prefix /prefixcolor</b></li>
        <li>✅ +5 точок <b>/home</b></li>
        <li>✅ Можливість повернутись до <b>/back</b></li>
        <li>✅ Зміна назви і кольору приватів</li>
        <li>✅ Можливість створювати <b>/setwarp</b></li>
        <li>✅ Зміна нікнейму</li>
        <li>✅ Унікальна роль в Discord Amethyst</li>
      </ul>
      <button @click="openModal('amethyst')" class="sub-button" style="width: 100%; border: none; cursor: pointer; display: block; background: #bd00ed; color: white; padding: 15px; border-radius: 12px; font-weight: bold;">Підписатись</button>
    </div>
    <div class="sub-card sub-card-ruby" style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 24px; padding: 40px; text-align: center; transition: all 0.4s ease-out; position: relative; overflow: visible;">
      <img src="/ruby.png" alt="Ruby Rank" style="width: 100px; height: 100px; margin: 0 auto 20px; display: block; border-radius: 16px; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" />
      <h2 style="font-size: 28px; margin-bottom: 10px; color: var(--vp-c-text-1);">RUBY</h2>
      <div style="font-size: 32px; font-weight: bold; color: #a50727; margin-bottom: 25px;">390 грн <span style="font-size: 16px; font-weight: normal; color: var(--vp-c-text-2);">/ міс</span></div>
      <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 40px; color: var(--vp-c-text-2); font-size: 15px; line-height: 2;">
        <li>✅ Все, що є в <b>Amethyst</b></li>
        <li>✅ Зміна суфіксу</li>
        <li>✅ Веселковий нікнейм і ефекти</li>
        <li>✅ Повний доступ до кастомізації <b>/chateditor</b> </li>
        <li>✅ +15 точок <b>/home</b></li>
        <li>✅ Унікальна роль в Discord Ruby</li>
        <li>✅ Зміна кольору в Discord</li>
        <li>✅ Чат RUBY (Direct адмін-чат)</li>
      </ul>
      <button @click="openModal('ruby')" class="sub-button" style="width: 100%; border: none; cursor: pointer; display: block; background: #a50727; color: white; padding: 15px; border-radius: 12px; font-weight: bold;">Підписатись</button>
    </div>
  </div>
  <div style="margin-top: 60px; padding: 30px; background: var(--vp-c-bg-soft); border-radius: 20px; border: 1px dashed var(--vp-c-divider); text-align: center;">
    <h3 style="color: var(--vp-c-text-1); margin-bottom: 15px;">ℹ️ Важлива інформація</h3>
    <p style="color: var(--vp-c-text-2); font-size: 16px; line-height: 1.6; max-width: 800px; margin: 0 auto;">
      Ми не використовуємо автоматичні підписки. Кожна оплата є <b>одноразовим внеском</b> на підтримку проекту. Гроші не будуть списуватися автоматично наступного місяця. 
      <br><br>
      Наш Discord-бот автоматично надішле вам нагадування за <b>3 дні</b> до закінчення терміну дії статусу з посиланням на добровільне продовження.
    </p>
  </div>
</div>
<div v-if="isModalOpen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(5px);">
  <div style="background: var(--vp-c-bg); padding: 30px; border-radius: 16px; width: 90%; max-width: 400px; border: 1px solid var(--vp-c-divider); box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
    <h3 style="margin-top: 0; margin-bottom: 20px; color: var(--vp-c-text-1);">Підтримка проекту</h3>
    <label style="display: block; margin-bottom: 5px; font-weight: bold; color: var(--vp-c-text-2);">Ігровий нікнейм:</label>
    <input v-model="nickname" type="text" placeholder="Приклад: Andryushka" style="width: 100%; box-sizing: border-box; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);" />
    <label style="display: block; margin-bottom: 5px; font-weight: bold; color: var(--vp-c-text-2);">Discord Нікнейм (username):</label>
    <input v-model="discordId" type="text" placeholder="Приклад: laggyua" style="width: 100%; box-sizing: border-box; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);" />
    <div style="background: rgba(220, 53, 69, 0.1); border-left: 4px solid #dc3545; padding: 8px 12px; margin-bottom: 20px; border-radius: 4px; font-size: 11px; color: var(--vp-c-text-2); line-height: 1.4;">
      ⚠️ <b>Не змінюйте суму та коментар на сторінці Банки!</b> Там вписано номер замовлення — без нього бот не впізнає ваш внесок.
    </div>
    <div style="display: flex; gap: 10px;">
      <button @click="closeModal" style="flex: 1; padding: 12px; border-radius: 8px; background: #6c757d; color: white; font-weight: bold; border: none; cursor: pointer;">Скасувати</button>
      <button @click="submitForm" :disabled="isLoading" class="mono-pay-btn">
        <span v-if="isLoading">Обробка...</span>
        <span v-else>Перейти до банки mono</span>
      </button>
    </div>
  </div>
</div>

<style>
  .sub-card:not(.sub-card-ruby):hover { transform: translateY(-10px); border-color: var(--vp-c-brand) !important; }
  .sub-card.active:not(.sub-card-ruby):hover { transform: scale(1.08) translateY(-10px); }
  .sub-card-ruby:hover { transform: translateY(-20px) scale(1.05); border-color: #a50727 !important; }
  .sub-card-ruby::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 24px; z-index: -1; transition: opacity 0.5s ease; opacity: 0; }
  .sub-card-ruby:hover::before { opacity: 1; box-shadow: 0 0 20px rgba(165, 7, 39, 0.7); animation: rubyPulseGlow 1.5s infinite alternate ease-in-out; }
  @keyframes rubyPulseGlow { 0% { box-shadow: 0 0 15px rgba(165, 7, 39, 0.7); } 100% { box-shadow: 0 0 25px rgba(165, 7, 39, 0.9); } }
  .sub-button:hover { filter: brightness(1.2); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
  .mono-pay-btn { width: 100%; padding: 12px; border-radius: 8px; background: #000000; color: white; font-weight: bold; font-size: 15px; border: none; cursor: pointer; }
</style>

<script setup>
import { ref } from 'vue'
const isModalOpen = ref(false)
const selectedTier = ref('')
const nickname = ref('')
const discordId = ref('')
const isLoading = ref(false)

const openModal = (tier) => { selectedTier.value = tier; isModalOpen.value = true; }
const closeModal = () => { isModalOpen.value = false; nickname.value = ''; discordId.value = ''; }

const submitForm = async () => {
  if (!nickname.value || !discordId.value) { alert("Заповніть усі поля!"); return; }
  isLoading.value = true
  try {
    const response = await fetch('https://shop.hytaleua.com.ua:3000/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: selectedTier.value, nickname: nickname.value, discordId: discordId.value })
    })
    const data = await response.json()
    if (data.checkoutUrl) { window.location.href = data.checkoutUrl }
    else { alert(data.error || "Помилка створення платежу.") }
  } catch (error) { alert("Помилка з'єднання з сервером.") }
  isLoading.value = false
}
</script>
