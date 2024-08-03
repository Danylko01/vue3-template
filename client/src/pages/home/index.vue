<!--
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-05-31 07:31:32
 * @LastEditTime: 2024-07-18 18:30:37
-->
<script setup>
import { inject } from 'vue'
import { getTest } from './service'
import { useThemeStore } from '@/stores/theme'
defineOptions({
  name: 'HomePage'
})
const themeStore = useThemeStore()

const toggleTheme = () => {
  const newTheme = themeStore.theme === 'light' ? 'dark' : 'light'
  themeStore.setTheme(newTheme)
}


const handleTest = async () => {
  const res = await getTest()
  console.log('res', res)
}
handleTest()
handleTest()
const config = inject('variable')
console.log('config', config)
</script>

<template>
  <div class="content">
    <button @click="toggleTheme">Toggle Theme</button>
  </div>
</template>

<style lang="less" scoped>
.content {
}
</style>
