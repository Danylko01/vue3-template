<!--
 * @Description: 图片裁剪
 * @Author: Danylko
 * @Date: 2024-07-31 06:33:52
 * @LastEditTime: 2024-07-31 07:23:58
-->
<template>
  <div>
    <input type="file" @change="onFileChange" />
    <div v-if="image" class="crop-container">
      <vue-cropper ref="cropper" :src="image" :aspectRatio="1" :viewMode="1" :guides="true" />
    </div>
    <button @click="cropImage">Crop & Upload</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import axios from 'axios'
defineOptions({
  name: 'CropperPage'
})

const image = ref(null)
const cropper = ref(null)

const onFileChange = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    const reader = new FileReader()
    reader.onload = (e) => {
      image.value = e.target.result
    }
    reader.readAsDataURL(files[0])
  }
}

const cropImage = () => {
  if (cropper.value) {
    cropper.value.getCroppedCanvas().toBlob((blob) => {
      const formData = new FormData()
      formData.append('file', blob, 'cropped-image.png')
      axios
        .post('your-upload-url', formData)
        .then((response) => {
          console.log('Image uploaded successfully', response.data)
        })
        .catch((error) => {
          console.error('Error uploading image', error)
        })
    })
  }
}
</script>
<style lang="less" scoped>
.crop-container {
  width: 400px;
  height: 400px;
}
</style>
