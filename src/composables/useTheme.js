import { ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

export function useTheme() {
  const colorMode = useColorMode()

  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  watch(colorMode, (newMode) => {
    console.log('Theme changed to:', newMode)
    if (newMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })

  return {
    mode: colorMode,
    toggleTheme
  }
}
