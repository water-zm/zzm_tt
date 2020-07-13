<template>
  <div class="reply">
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <van-cell title="当前评论" />
      <comment :item="currentComment" />
      <van-cell title="评论回复" />
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <comment :item="replyitem" v-for="(replyitem, index) in replyList" :key="index" />
      </van-list>
      <write @passcomment="passcomment" :currentComment="currentComment" :isReply="true" />
    </van-popup>
  </div>
</template>

<script>
import bus from '@/utils/mybus'
import comment from './comment'
import write from './write'
import { apiGetReply } from '@/api/comment'
export default {
  data () {
    return {
      show: false,
      currentComment: {},
      loading: false,
      finished: false,
      replyList: [],
      endid: null,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      const res = await apiGetReply({
        comId: this.currentComment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.replyList = [...this.replyList, ...res.data.data.results]
      console.log('current', this.replyList)
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      this.loading = false
      if (this.endid === this.offset) {
        this.finished = true
      }
    },
    passcomment (mycom) {
      this.replyList.unshift(mycom)
    }
  },
  created () {
    bus.$on('passval', val => {
      this.currentComment = val
      // 打开清空回复面板
      this.loading = false
      this.finished = false
      this.replyList = []
      this.offset = null
      this.endid = null
    })
  },
  components: {
    comment,
    write
  }
}
</script>

<style>
</style>
