<template>
  <div class="more">
    <van-popup v-model="show" class="mypopup">
      <van-cell-group v-if="!isReport">
        <van-cell @click="dislikes" title="不感兴趣" icon="closed-eye" />
        <van-cell @click="isReport=true" title="反馈垃圾内容" icon="warn-o" is-link class="mycell" />
        <van-cell @click="black" title="拉黑该作者" icon="delete" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell @click="isReport=false">
          <template #title><van-icon name="arrow-left" /></template>
        </van-cell>
        <van-cell @click="reports(item.type)" v-for="(item, index) in reportType" :key="index" :title="item.name"/>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { apiReports } from '@/api/article'
import { apiBlackLists } from '@/api/user'
export default {
  props: ['autId', 'artId'],
  data () {
    return {
      show: false,
      isReport: false,
      reportType: [
        { type: 0, name: '其他问题' },
        { type: 1, name: '标题夸张' },
        { type: 2, name: '低俗色情' },
        { type: 3, name: '错别字多' },
        { type: 4, name: '旧闻重复' },
        { type: 5, name: '广告软文' },
        { type: 6, name: '内容不实' },
        { type: 7, name: '涉嫌违法犯罪' },
        { type: 8, name: '侵权' }
      ]
    }
  },
  methods: {
    // 不感兴趣
    dislikes () {
      this.$emit('dislike', this.artId)
    },
    // 举报
    async reports (type) {
      await apiReports({
        artId: this.artId,
        type: type
      })
      this.show = false
      this.isReport = false
      this.$toast.success('您的反馈，我们已经接收，我们会在三个工作日内给您答案，请而心等待')
    },
    // 拉黑作者
    async black () {
      await apiBlackLists(this.autId)
      this.show = false
      this.$toast.success('拉黑成功，刷新后将不再推送该作者有关文章')
    }
  }
}
</script>

<style lang="less" scoped>
.more {
    .mypopup {
        width: 85%;
        border-radius: 10px;
        .mycell {
            border-top: 1px solid #ededed;
            border-bottom: 1px solid #ededed;
        }
    }
}
</style>
