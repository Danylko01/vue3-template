<!--
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-05-31 06:38:11
 * @LastEditTime: 2024-06-09 12:09:56
-->
<!-- src/components/AppComposition.vue -->

<template>
  <div :class="theme">
    <button @click="toggleTheme">Toggle Theme</button>
    <RouterLink class="nav-link" to="/">首页</RouterLink>
    <RouterLink class="nav-link" to="/about">关于</RouterLink>
    <router-view />
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  const newTheme = themeStore.theme === 'light' ? 'dark' : 'light'
  themeStore.setTheme(newTheme)
}

const theme = themeStore.theme
themeStore.setTheme(theme)
console.log('thenme', theme)
</script>

<style lang="less">
@import '@/assets/styles/themes.less';
</style>
