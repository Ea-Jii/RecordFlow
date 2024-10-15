<template>
  <div :class="{ 'dark': isDarkMode }">
    <div class="min-h-screen bg-background text-foreground">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { mode } = useTheme()
const isDarkMode = computed(() => mode.value === 'dark')
</script>




