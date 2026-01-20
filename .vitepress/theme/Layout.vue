<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'

const { Layout } = DefaultTheme
const router = useRouter()

// Функція для повернення назад
const goBack = () => {
  window.history.back()
}
</script>

<template>
  <Layout>
    <template #doc-before>
      <button @click="goBack" class="back-button">
        <span class="icon">←</span> Назад
      </button>
    </template>

    <template #layout-bottom>
      <div class="bg-glow">
        <div class="blob blue"></div>
        <div class="blob yellow"></div>
      </div>
    </template>
  </Layout>
</template>
