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
  - icon: 🛡️
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
  - icon: ⚔️
    title: Стабільність
    details: Стабільність понад усе! Регулярні бекапи світу, постійна робота над швидкодією і безпекою сервера! Будьте впевнені, ваш прогрес у надійних руках.
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const ipButton = document.querySelector('a[href="#copy-ip"]')
  const serverIp = "play.hytaleua.com.ua:15805"

  if (ipButton) {
    ipButton.addEventListener('click', (e) => {
      e.preventDefault() // Щоб сторінка не стрибала вгору
      
      navigator.clipboard.writeText(serverIp).then(() => {
        // Змінюємо текст кнопки для візуального відгуку
        const originalText = ipButton.innerText
        ipButton.innerText = "✅ Скопійовано!"
        ipButton.style.borderColor = "#4caf50"
        
        // Повертаємо текст назад через 2 секунди
        setTimeout(() => {
          ipButton.innerText = originalText
          ipButton.style.borderColor = ""
        }, 2000)
      })
    })
  }
  
  const widgetContainer = document.getElementById('monicore-widget-container');
  // Перевіряємо, чи є контейнер і чи ми ще не додали скрипт
  if (widgetContainer && !document.getElementById('monicore-script')) {
    const script = document.createElement('script');
    script.id = 'monicore-script';
    script.src = 'https://monicore.com.ua/static/widget.js';
    script.setAttribute('data-server-id', '430');
    script.async = true;
    widgetContainer.appendChild(script);
  }
})
</script>

<div class="bg-glow">
  <div class="blob blue"></div>
  <div class="blob yellow"></div>
</div>

<div style="max-width: 1152px; margin: 40px auto; padding: 20px; border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-family: sans-serif; text-align: center;">
  <div style="background-color: var(--vp-c-bg-soft); padding: 24px; border-radius: 12px; text-align: left; font-size: 14px; line-height: 1.6;">
    <h4 style="margin-top: 0; margin-bottom: 10px; color: var(--vp-c-text-1);">Контактна інформація</h4>
    <p style="margin-top: 0;"><strong>Email:</strong> andryushka05@gmail.com | <strong>Discord:</strong> <a href="https://discord.gg/JS75DCe9Dk" target="_blank">Приєднатися до сервера</a></p>
    <h4 style="margin-top: 20px; margin-bottom: 10px; color: var(--vp-c-text-1);">Договір публічної оферти (Підтримка проекту)</h4>
    <p style="margin-top: 0;">Здійснюючи платіж на сайті hytaleua.com.ua, користувач надає добровільну фінансову підтримку (донат) на розвиток ігрового проекту HytaleUA. Всі отримані кошти спрямовуються на оплату хостингу, технічне обслуговування та розробку контенту. Як подяку за підтримку, проект надає користувачу віртуальні внутрішньоігрові винагороди (статуси/предмети). Дані винагороди не є об'єктом продажу, а є цифровим заохоченням меценатів проекту.</p>
    <h4 style="margin-top: 20px; margin-bottom: 10px; color: var(--vp-c-text-1);">Політика повернення коштів (Refund Policy)</h4>
    <p style="margin-top: 0; margin-bottom: 0;">Оскільки фінансова підтримка проекту є добровільною, а винагороди надаються автоматично в цифровому вигляді одразу після надходження коштів, повернення внесків не передбачено. Проте, адміністрація залишає за собою право розглянути можливість повернення у виключних випадках (наприклад, технічний збій при видачі винагороди, що не був усунутий протягом 24 годин). У разі виникнення будь-яких питань, звертайтесь до підтримки через наш Discord-сервер.</p>
  </div>
</div>
