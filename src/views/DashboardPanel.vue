<template>
  <div class="flex flex-col h-screen bg-background">
    <Header />
    <main class="flex-1 overflow-hidden pt-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/dashboard/Header.vue';
</script>
