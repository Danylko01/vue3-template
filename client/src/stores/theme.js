import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light')
  function setTheme(newTheme) {
    theme.value = newTheme
    document.documentElement.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme'
  }
  return { theme, setTheme }
})
