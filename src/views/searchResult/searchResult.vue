<template>
  <div class="result">
    <van-nav-bar title="搜索结果" @click-left="back" fixed left-arrow class="l-title" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell-group>
        <van-cell v-for="(item, index) in resultList" :key="index">
          <template #title>
            <h4>{{ item.title }}</h4>
            <van-grid v-if="item.cover.type !== 0" :border="false" :column-num="3">
              <van-grid-item v-for="(imgitem, imgindex) in item.cover.images" :key="imgindex">
                <van-image lazy-load :src="imgitem" />
              </van-grid-item>
            </van-grid>
            <div class="box">
              <div class="left">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }} 评论</span>
                <span>{{ item.pubdate | timefilter }}</span>
              </div>
            </div>
            <van-grid direction="horizontal" :column-num="3">
              <van-grid-item icon="like-o" text="点赞" />
              <van-grid-item @click="comment" icon="comment-o" :text="item.comm_count+''" />
              <van-grid-item icon="exchange" text="分享" />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { apiSearchResult } from '@/api/search'
export default {
  data () {
    return {
      loading: false,
      isLoading: false,
      finished: false,
      page: 1,
      perpage: 10,
      key: this.$route.params.key,
      resultList: [],
      total: 0
    }
  },
  methods: {
    async onLoad () {
      const res = await apiSearchResult({
        page: this.page,
        perpage: this.perpage,
        key: this.key
      })
      console.log(res)
      this.resultList = [...this.resultList, ...res.data.data.results]
      this.total = res.data.data.total_count
      this.loading = false
      this.page++
      if (this.total === this.resultList.length) {
        this.finished = true
      }
    },
    back () {
      this.$router.back()
    },
    comment () {
      if (!this.$login('对不起，需要登录才可以评论，请先登录')) {
        return
      }
      console.log('留言')
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  margin-top: 46px;
  background-color: #f2f6fc;
  .l-title {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  .box {
    display: flex;
    justify-content: space-between;
    .left {
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
