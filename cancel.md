---
layout: page
title: Керування підпискою
---

<div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: sans-serif;"> 
  <div style="text-align: center; margin-bottom: 50px;">
    <h1 style="font-size: 48px; font-weight: 800; color: var(--vp-c-text-1); margin-bottom: 10px;">Керування підпискою</h1>
    <p style="font-size: 18px; color: var(--vp-c-text-2);">Безпечне скасування регулярних платежів через Discord</p>
  </div>
  <div style="max-width: 450px; margin: 0 auto; padding: 40px; background: var(--vp-c-bg-soft); border-radius: 24px; border: 1px solid var(--vp-c-divider); box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
    <div style="font-size: 48px; text-align: center; margin-bottom: 20px;">🛡️</div>
    <h3 style="margin-top: 0; margin-bottom: 15px; color: var(--vp-c-text-1); text-align: center; font-size: 24px;">Скасування підписки</h3>
    <p style="font-size: 15px; color: var(--vp-c-text-2); margin-bottom: 25px; text-align: center; line-height: 1.6;">
      Введіть свій ігровий нікнейм. З метою безпеки ми надішлемо запит на підтвердження в особисті повідомлення вашого Discord.
    </p>
    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: var(--vp-c-text-2);">Ваш ігровий нікнейм:</label>
    <input v-model="cancelNickname" type="text" placeholder="Наприклад: laggyua" style="width: 100%; box-sizing: border-box; padding: 15px; margin-bottom: 25px; border-radius: 12px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); font-size: 16px;" />
    <button @click="requestCancel" :disabled="isCanceling" class="cancel-btn" style="width: 100%; padding: 15px; border-radius: 12px; background: #e63946; color: white; font-weight: bold; font-size: 16px; border: none; cursor: pointer; transition: all 0.3s ease;">
      {{ isCanceling ? 'Відправка запиту...' : 'Скасувати' }}
    </button>
    <div v-if="cancelMessage" :style="{ marginTop: '20px', padding: '15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px', textAlign: 'center', backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(230, 57, 70, 0.1)', color: isSuccess ? '#10b981' : '#e63946', border: '1px solid', borderColor: isSuccess ? 'rgba(16, 185, 129, 0.3)' : 'rgba(230, 57, 70, 0.3)' }">
      {{ cancelMessage }}
    </div>
  </div>
</div>

<style>
.cancel-btn:hover:not(:disabled) {
  background: #d62828 !important;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(230, 57, 70, 0.3);
}
.cancel-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed !important;
}
</style>

<script setup>
import { ref } from 'vue'

const cancelNickname = ref('')
const isCanceling = ref(false)
const cancelMessage = ref('')
const isSuccess = ref(false)

const requestCancel = async () => {
  // Очищаємо попередні повідомлення
  cancelMessage.value = '';
  isSuccess.value = false;

  if (!cancelNickname.value) {
    cancelMessage.value = "Будь ласка, введіть нікнейм!"; 
    return;
  }

  isCanceling.value = true;

  try {
    const res = await fetch('https://shop.hytaleua.com.ua:3000/api/request-cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: cancelNickname.value })
    });

    const data = await res.json();
    
    if (res.ok) {
      isSuccess.value = true;
      cancelMessage.value = "Для скасування перейдіть в особисті повідомлення від нашого бота в Discord та напишіть йому 'Підтвердити'.";
    } else {
      isSuccess.value = false;
      cancelMessage.value = "❌ " + (data.error || "Сталася помилка");
    }
  } catch (error) {
    isSuccess.value = false;
    cancelMessage.value = "❌ Помилка з'єднання з сервером. Перевірте інтернет або спробуйте пізніше.";
  }
  
  isCanceling.value = false;
}
</script>
