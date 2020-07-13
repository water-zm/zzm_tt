<template>
  <div class="write">
      <van-search
    v-model="value"
    show-action
    left-icon=""
    placeholder="发表评论"
    @search="onSearch"
    @cancel="onCancel"
    background="#e9ebec"
    shape="round"
    class="search"
  >
    <template #action>
        <van-button @click="onSearch" type="info">发送</van-button>
    </template>
  </van-search>
  </div>
</template>

<script>
import { apiAddComment, apiAddReply } from '@/api/comment'
export default {
  props: ['isReply', 'currentComment'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch (val) {
      if (this.value.trim().length === 0) {
        this.value = ''
        return
      }
      if (this.isReply) {
        // 评论回复
        const res = await apiAddReply({
          comId: this.currentComment.com_id.toString(),
          content: this.value,
          artId: this.$route.params.artid
        })
        const mycom = res.data.data.new_obj
        this.$emit('passcomment', mycom)
      } else {
        // 文章评论
        const res = await apiAddComment({
          artId: this.$route.params.artid,
          content: this.value
        })
        const mycom = res.data.data.new_obj
        this.$emit('passcomment', mycom)
      }
      this.value = ''
    },
    onCancel () {
      this.$toast('取消')
    }
  }
}
</script>

<style lang="less" scoped>
.write {
    .search {
        position: fixed;
        bottom: 0;
        width: 100%;
        .van-button {
            height: 35px;
        }
    }
}
</style>
