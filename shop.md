<div style="max-width: 400px; margin: 40px auto; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 16px; border: 1px solid var(--vp-c-divider);">
  <h3 style="margin-top: 0;">🗺️ Додаткові чанки (Приват)</h3>
  <p style="color: var(--vp-c-text-2); font-size: 14px;">Розширте свою територію! 1 чанк = 3 грн.</p>

  <label style="display: block; font-weight: bold; margin-bottom: 5px;">Твій нікнейм:</label>
  <input v-model="shopNickname" type="text" placeholder="laggyua" style="width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">

  <label style="display: block; font-weight: bold; margin-bottom: 5px;">Скільки чанків купити?</label>
  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
    <input v-model="chunkCount" type="number" min="1" max="100" style="width: 80px; padding: 10px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);">
    <span style="font-weight: bold; color: var(--vp-c-brand);">Всього: {{ chunkCount * 3 }} грн</span>
  </div>

  <button @click="buyChunks" :disabled="isShopLoading" style="width: 100%; padding: 12px; border-radius: 8px; background: #4caf50; color: white; font-weight: bold; border: none; cursor: pointer;">
    {{ isShopLoading ? 'Створення рахунку...' : 'Оплатити' }}
  </button>
</div>

<script setup>
import { ref } from 'vue'

const shopNickname = ref('')
const chunkCount = ref(5) // За замовчуванням 5 чанків
const isShopLoading = ref(false)

const buyChunks = async () => {
  if (!shopNickname.value) {
    alert("Введіть нікнейм!"); return;
  }
  if (chunkCount.value < 1) {
    alert("Кількість має бути більше 0!"); return;
  }

  isShopLoading.value = true;

  try {
    const res = await fetch('https://shop.hytaleua.com.ua:3000/api/create-shop-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId: 'chunks',
        quantity: chunkCount.value,
        nickname: shopNickname.value
      })
    });
    
    const data = await res.json();
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
  } catch (error) {
    alert("Помилка з'єднання з сервером.");
  }
  isShopLoading.value = false;
}
</script>
