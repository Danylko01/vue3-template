import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storeTheme, getTheme } from '@/utils/storage'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light')
  if (getTheme()) {
    theme.value = getTheme()
  }
  function setTheme(newTheme) {
    theme.value = newTheme
    storeTheme(newTheme)
    document.documentElement.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme'
  }
  return { theme, setTheme }
})
