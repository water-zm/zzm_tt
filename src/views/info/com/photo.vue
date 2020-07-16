<template>
  <van-popup class="photo" v-model="show" :close-on-click-overlay="false">
      <div class="box">
          <div @click="$refs.myfile.click()">从相册中选择</div>
          <input @change="changeImg" ref="myfile" type="file" style="display: none">
          <div class="mid">拍照</div>
          <div @click="show = false">取消</div>
      </div>
  </van-popup>
</template>

<script>
import { ImagePreview } from 'vant'
import { apiUpdatePhoto } from '@/api/user'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    changeImg () {
      const file = this.$refs.myfile.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        ImagePreview({
          images: [reader.result],
          onClose: this.closeImg
        })
      })
    },
    closeImg () {
      this.show = false
      this.$dialog.confirm({
        title: '修改头像',
        message: '是否将此图片设置为头像'
      }).then(async () => {
        // on confirm
        const file = this.$refs.myfile.files[0]
        const res = await apiUpdatePhoto(file)
        this.$emit('updatePhoto', res.data.data.photo)
        this.$toast('图片上传成功')
      }).catch(() => {
        // on cancel
        this.$refs.myfile.value = []
        this.$toast('图片取消上传')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.photo {
    width: 75%;
    border-radius: 10px;
    .box {
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        .mid {
            border-top: 1px solid #ededed;
            border-bottom: 1px solid #ededed;
        }
    }
}
</style>
