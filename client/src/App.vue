<!--
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-05-31 06:38:11
 * @LastEditTime: 2024-07-18 20:47:56
-->
<!-- src/components/AppComposition.vue -->

<template>
  <div class="app">
    <!-- <button @click="toggleTheme">Toggle Theme</button>
    <RouterLink class="nav-link" to="/">首页</RouterLink>
    <RouterLink class="nav-link" to="/about">关于</RouterLink> -->
    <router-view />
    <DockerBar :items="items" class="docker-bar" />
    <SettingBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DockerBar from '@/layouts/docker.vue'
import SettingBar from '@/layouts/setting.vue'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const items = ref([
  { key: '首页', value: '/' },
  { key: '关于', value: '/about' },
  { key: '裁剪', value: '/cropper' }
])
const theme = themeStore.theme
themeStore.setTheme(theme)
</script>

<style lang="less">
/* @import '@/assets/styles/themes.less'; */
// body {
//   margin: 0;
//   overflow: hidden; /* 禁止页面滚动 */
// }
.app {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 160px;
  grid-template-columns: 100%;
  color: var(--text-primary);
}
</style>
