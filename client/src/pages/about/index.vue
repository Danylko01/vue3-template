<!--
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-06-29 12:28:39
 * @LastEditTime: 2024-07-08 07:30:50
-->
<template>
  <div class="container" ref="container">
    <div class="left-box" ref="leftBox">
      <div class="box-content">Left Box Content</div>
      <div class="resizer vertical" @mousedown="startResize($event, 'vertical')"></div>
    </div>
    <div class="right-box">
      <div class="top-box" ref="topBox">
        <div class="box-content">Top Box Content</div>
        <div class="resizer horizontal" @mousedown="startResize($event, 'horizontal')"></div>
      </div>
      <div class="bottom-box" ref="bottomBox">
        <div class="box-content">Bottom Box Content</div>
        <div class="resizer horizontal" @mousedown="startResize($event, 'horizontalBottom')"></div>
      </div>
      <div class="resizer vertical" @mousedown="startResize($event, 'verticalRight')"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({
  name: 'AboutPage'
})
const container = ref(null)
const leftBox = ref(null)
const topBox = ref(null)
const bottomBox = ref(null)

let isResizing = ref(false)
let resizeDirection = ref('')

const startResize = (e, direction) => {
  isResizing.value = true
  resizeDirection.value = direction
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

const handleResize = (e) => {
  if (!isResizing.value) return

  const containerRect = container.value.getBoundingClientRect()

  if (resizeDirection.value === 'vertical') {
    const newWidth = e.clientX - containerRect.left
    const minWidth = 50
    const maxWidth = containerRect.width - 50

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      leftBox.value.style.width = `${newWidth}px`
      document.querySelector('.right-box').style.width = `${containerRect.width - newWidth - 10}px`
    }
  } else if (resizeDirection.value === 'verticalRight') {
    const newWidth = e.clientX - leftBox.value.getBoundingClientRect().right
    const minWidth = 50
    const maxWidth = containerRect.width - leftBox.value.getBoundingClientRect().right - 50

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      document.querySelector('.right-box').style.width = `${newWidth}px`
    }
  } else if (resizeDirection.value === 'horizontal') {
    const newHeight = e.clientY - containerRect.top
    const minHeight = 50
    const maxHeight = containerRect.height - 50

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      topBox.value.style.height = `${newHeight}px`
      bottomBox.value.style.height = `${containerRect.height - newHeight - 10}px`
    }
  } else if (resizeDirection.value === 'horizontalBottom') {
    const newHeight = e.clientY - topBox.value.getBoundingClientRect().bottom
    const minHeight = 50
    const maxHeight = containerRect.height - topBox.value.getBoundingClientRect().bottom - 50

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      bottomBox.value.style.height = `${newHeight}px`
    }
  }
}

const stopResize = () => {
  isResizing.value = false
  resizeDirection.value = ''
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<style>
body {
  margin: 0;
  overflow: hidden; /* 禁止页面滚动 */
}

.container {
  display: flex;
  /* height: 100vh;
  width: 100vw; */
}

.left-box {
  width: 50%;
  background-color: lightblue;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.top-box {
  height: 50%;
  background-color: lightcoral;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bottom-box {
  height: 50%;
  background-color: lightgreen;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.box-content {
  padding: 10px;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
}

.resizer {
  position: absolute;
  background-color: darkgray;
}

.vertical {
  width: 10px;
  height: 100%;
  right: 0;
  top: 0;
  cursor: col-resize;
}

.horizontal {
  height: 10px;
  width: 100%;
  bottom: 0;
  left: 0;
  cursor: row-resize;
}
</style>
