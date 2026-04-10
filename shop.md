---
layout: page
title: Магазин
---

<div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: sans-serif;"> 
  <div style="text-align: center; margin-bottom: 50px;">
    <h1 style="font-size: 48px; font-weight: 800; color: var(--vp-c-text-1); margin-bottom: 10px;">Ігровий Магазин</h1>
    <p style="font-size: 18px; color: var(--vp-c-text-2);">Купуйте корисні предмети та розширюйте свої можливості</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
    <div class="shop-card" style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 24px; padding: 40px; text-align: center; transition: transform 0.3s ease, border-color 0.3s ease;">
      <img src="/claim.png" alt="Чанки" style="width: 100px; height: 100px; margin: 0 auto 20px; display: block; border-radius: 16px; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" />
      <h2 style="font-size: 24px; margin-bottom: 10px; color: var(--vp-c-text-1);">Додаткові чанки (Приват)</h2>
      <div style="font-size: 28px; font-weight: bold; color: var(--vp-c-brand); margin-bottom: 25px;">3 грн <span style="font-size: 16px; font-weight: normal; color: var(--vp-c-text-2);">/ шт</span></div>
      <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 40px; color: var(--vp-c-text-2); font-size: 15px; line-height: 2;">
        <li>✅ Збільшення ліміту привату</li>
        <li>✅ Можливість будувати більші бази</li>
        <li>✅ Назавжди залишається на акаунті</li>
      </ul>
      <button @click="openModal('chunks', 'Додаткові чанки', 3)" class="shop-button" style="width: 100%; border: none; cursor: pointer; display: block; background: var(--vp-c-brand); color: white; padding: 15px; border-radius: 12px; font-weight: bold;">Придбати</button>
    </div>
    <div class="shop-card" style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 24px; padding: 40px; text-align: center; transition: transform 0.3s ease, border-color 0.3s ease;">
      <img src="/claim.png" alt="Монети" style="width: 100px; height: 100px; margin: 0 auto 20px; display: block; border-radius: 16px; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" />
      <h2 style="font-size: 24px; margin-bottom: 10px; color: var(--vp-c-text-1);">Ігрові монети</h2>
      <div style="font-size: 28px; font-weight: bold; color: var(--vp-c-brand); margin-bottom: 25px;">10 грн <span style="font-size: 16px; font-weight: normal; color: var(--vp-c-text-2);">/ 1000 шт</span></div>
      <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 40px; color: var(--vp-c-text-2); font-size: 15px; line-height: 2;">
        <li>✅ Купівля предметів на аукціоні</li>
        <li>✅ Торгівля з іншими гравцями</li>
        <li>✅ Швидкий старт в економіці сервера</li>
      </ul>
      <button @click="openModal('coins', 'Ігрові монети', 10)" class="shop-button" style="width: 100%; border: none; cursor: pointer; display: block; background: var(--vp-c-brand); color: white; padding: 15px; border-radius: 12px; font-weight: bold;">Придбати</button>
    </div>
  </div>
</div>
<div v-if="isModalOpen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(5px);">
  <div style="background: var(--vp-c-bg); padding: 30px; border-radius: 16px; width: 90%; max-width: 400px; border: 1px solid var(--vp-c-divider); box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
    <h3 style="margin-top: 0; margin-bottom: 5px; color: var(--vp-c-text-1);">Оформлення замовлення</h3>
    <div style="color: var(--vp-c-brand); font-weight: bold; margin-bottom: 20px; font-size: 18px;">Товар: {{ selectedItemName }}</div>
    <label style="display: block; margin-bottom: 5px; font-weight: bold; color: var(--vp-c-text-2);">Ваш ігровий нікнейм:</label>
    <input v-model="shopNickname" type="text" placeholder="Наприклад: laggyua" style="width: 100%; box-sizing: border-box; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);" />
    <label style="display: block; margin-bottom: 5px; font-weight: bold; color: var(--vp-c-text-2);">Кількість:</label>
    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
      <input v-model="quantity" type="number" min="1" max="1000" style="width: 100px; box-sizing: border-box; padding: 12px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);" />
      <div style="font-size: 18px; font-weight: bold; color: var(--vp-c-text-1);">
        До сплати: <span style="color: var(--vp-c-brand);">{{ quantity * selectedItemPrice }} грн</span>
      </div>
    </div>
    <div style="display: flex; gap: 10px;">
      <button @click="closeModal" style="flex: 1; padding: 12px; border-radius: 8px; background: #6c757d; color: white; font-weight: bold; border: none; cursor: pointer;">Скасувати</button>
        <button @click="submitPayment" :disabled="isLoading" class="mono-pay-btn">
  <span v-if="isLoading">Обробка...</span>
  <span v-else style="display: flex; align-items: center; justify-content: center; gap: 6px;">
    Оплатити з mono
    <span class="mono-pay-badge">Pay</span>
  </span>
</button>
    </div>
  </div>
</div>

<style>
.shop-card:hover {
  transform: translateY(-5px);
  border-color: var(--vp-c-brand) !important;
}
.shop-button:hover {
  filter: brightness(1.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.mono-pay-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: #000000;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.mono-pay-btn:hover:not(:disabled) {
  opacity: 0.85;
  transform: translateY(-2px);
}

.mono-pay-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mono-pay-badge {
  background: white;
  color: black;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
}
</style>

<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)
const selectedItemId = ref('')
const selectedItemName = ref('')
const selectedItemPrice = ref(0)

const shopNickname = ref('')
const quantity = ref(1)
const isLoading = ref(false)

const openModal = (id, name, price) => {
  selectedItemId.value = id
  selectedItemName.value = name
  selectedItemPrice.value = price
  quantity.value = 1 
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const submitPayment = async () => {
  if (!shopNickname.value) {
    alert("Будь ласка, введіть нікнейм!"); 
    return;
  }
  if (quantity.value < 1) {
    alert("Кількість має бути більшою за 0!"); 
    return;
  }

  isLoading.value = true;

  try {
    const res = await fetch('https://shop.hytaleua.com.ua:3000/api/create-shop-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId: selectedItemId.value,
        quantity: quantity.value,
        nickname: shopNickname.value
      })
    });

    const data = await res.json();
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Помилка створення рахунку. Спробуйте пізніше.");
    }
  } catch (error) {
    alert("Помилка з'єднання з сервером.");
  }
  
  isLoading.value = false;
}
</script>
