---
layout: page
---

<script setup>
import { data as posts } from './posts.data.ts'
</script>

<div class="news-feed">
  <div v-for="post in posts" :key="post.url" class="feed-item">
    
    <header class="article-hero">
      <div class="article-meta">
        <span class="tag">{{ post.tag }}</span>
        <span class="date">📅 {{ post.date }}</span>
      </div>
      <h1 class="article-title">
        <span>{{ post.title.replace(/[🚀🏆⚔️🛡️⚡🔄🎡📍]/g, '') }}</span> 
        {{ post.title.match(/[🚀🏆⚔️🛡️⚡🔄🎡📍]/g)?.join('') }}
      </h1>
    </header>

    <div class="article-banner">
      <img :src="post.image" :alt="post.title" />
    </div>

    <div class="article-content vp-doc" v-html="post.html"></div>

    <div class="feed-separator">
      <div class="separator-dot"></div>
    </div>
  </div>
</div>
