<template>
  <div class="result">
    <van-nav-bar title="搜索结果" @click-left="$router.back()" fixed left-arrow class="l-title" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell-group>
        <van-cell @click="getDetail(item)" v-for="(item, index) in resultList" :key="index">
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
              <van-grid-item @click.stop="dislikings(item)" v-if="item.attitude === 1" icon="like" style="color: red" text="点赞" />
              <van-grid-item @click.stop="likings(item)" v-else icon="like-o" text="点赞" />
              <van-grid-item @click="comment" icon="comment-o" :text="item.comm_count+''" />
              <van-grid-item @click.stop="showShare = true" icon="exchange" text="分享" />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
    <van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/>
  </div>
</template>

<script>
import { apiSearchResult } from '@/api/search'
import { apiLikings, apiDisLikings } from '@/api/article'
export default {
  data () {
    return {
      loading: false,
      isLoading: false,
      finished: false,
      page: 1,
      perpage: 10,
      key: this.$route.params.key,
      resultList: [], // 搜索结果
      total: 0,
      showShare: false, // 分享面板
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    async onLoad () {
      const res = await apiSearchResult({
        page: this.page,
        perpage: this.perpage,
        key: this.key
      })
      this.resultList = [...this.resultList, ...res.data.data.results]
      this.resultList.forEach(item => {
        this.$set(item, 'attitude', -1)
      })
      this.total = res.data.data.total_count
      this.loading = false
      this.page++
      if (this.total === this.resultList.length) {
        this.finished = true
      }
    },
    // 评论判断
    comment () {
      if (!this.$login('对不起，需要登录才可以评论，请先登录')) {
        return
      }
      console.log('留言')
    },
    // 跳转详情
    getDetail (item) {
      this.$router.push(`/detail/${item.art_id}`)
    },
    // 分享
    onSelect (option) {
      this.$toast(option.name)
      this.showShare = false
    },
    // 点赞
    async likings (item) {
      await apiLikings(item.art_id)
      item.attitude = 1
    },
    // 取消点赞
    async dislikings (item) {
      await apiDisLikings(item.art_id)
      item.attitude = -1
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
