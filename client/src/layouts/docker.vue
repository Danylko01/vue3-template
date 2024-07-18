<!--
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-07-05 06:05:08
 * @LastEditTime: 2024-07-18 18:27:22
-->
<template>
  <div class="dock" @mouseleave="resetSizes">
    <div
      v-for="(item, index) in items"
      :key="item.key"
      :style="getStyle(index)"
      class="dock-item"
      @mouseover="handleMouseOver(index)"
      @click="handleClick(item.value)"
    >
      {{ item.key }}
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'DockerBar'
})
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
const router = useRouter()
const scales = ref(new Array(props.items.length).fill(1))
const handleMouseOver = (index) => {
  const baseScale = 1.2
  const decay = 0.1
  scales.value = scales.value.map((scale, i) => {
    const distance = Math.abs(index - i)
    return Math.max(1, baseScale - distance * decay)
  })
}

const resetSizes = () => {
  scales.value = new Array(props.items.length).fill(1)
}

const getStyle = (index) => {
  const scale = scales.value[index]
  return {
    transform: `scale(${scale})`,
    margin: `${20 * scale}px`
  }
}

const handleClick = (value) => {
  router.push(value)
}
</script>
<style lang="less" scoped>
@import '@/assets/styles/themes.less';
.dock {
  /* height: 200px; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-secondary);
  .dock-item {
    width: 100px;
    height: 100px;
    transition:
      transform 0.3s,
      margin 0.3s;
    font-size: 20px;
    border-radius: 100px;
    box-shadow: 0 4px 8px var(--box-shadow);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--box-primary);
    &:hover {
      background-color: var(--box-hover);
    }
  }
}
</style>
