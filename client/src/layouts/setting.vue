<!--
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-07-18 20:44:56
 * @LastEditTime: 2024-07-18 21:03:59
-->
<template>
  <div class="settings-container">
    <!-- 设置图标，点击时触发 toggleSettings 方法 -->
    <div
      class="fa fa-cog"
      @click="toggleSettings"
      style="width: 100px; height: 100px; background-color: red"
    ></div>

    <!-- 设置功能的弹出框，根据 showSettings 控制显示与隐藏 -->
    <div class="settings-popup" v-if="showSettings">
      <ul>
        <li @click="logout">Logout</li>
        <li @click="toggleTheme">Toggle Theme</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({
  name: 'SettingBar'
}) // 使用 ref 创建响应式数据
const showSettings = ref(false)

// 点击设置图标时切换显示设置功能框
const toggleSettings = () => {
  console.log('ddd', showSettings.value)
  showSettings.value = !showSettings.value
}

// 登出功能的实现
const logout = () => {
  // 这里可以添加你的登出逻辑
  console.log('Logging out...')
}

// 切换主题功能的实现
const toggleTheme = () => {
  // 这里可以添加你的主题切换逻辑
  console.log('Toggling theme...')
}
</script>

<style scoped>
.settings-container {
  position: fixed;
  left: 20px;
  bottom: 20px;
}

.settings-popup {
  position: fixed;
  left: 40px;
  bottom: 40px;
  width: 150px;
  height: 150px;
  background: yellow;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
