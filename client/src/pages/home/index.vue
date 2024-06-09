<!--
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-05-31 07:31:32
 * @LastEditTime: 2024-06-09 15:55:17
-->
<script setup>
import { inject } from 'vue'
import { getTest } from './service'
defineOptions({
  name: 'HomePage'
})

const handleTest = async () => {
  const res = await getTest()
  console.log('res', res)
}
handleTest()
const config = inject('variable')
console.log('config', config)
</script>

<template>
  <div class="content">home</div>
</template>

<style lang="less" scoped>
.content {
  width: 200px;
  height: 200px;
  background-color: var(--secondary-color);
}
</style>
