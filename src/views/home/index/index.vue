<template>
  <div class="index">
    <van-nav-bar title="首页" fixed class="l-title" />
    <van-tabs v-model="active" sticky offset-top="46px">
      <van-tab v-for="(item, index) in channels" :key="index" :title="item.name">
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(subitem, subindex) in item.articleList" :key="subindex" :title="subitem.title">
              <template #title>
                <h4>{{ subitem.title }}</h4>
                <van-grid v-if="subitem.cover.type !== 0" :border="false" :column-num="3">
                  <van-grid-item v-for="(coveritem, coverindex) in subitem.cover.images" :key="coverindex">
                    <van-image lazy-load :src="coveritem" />
                  </van-grid-item>
                </van-grid>
                <div class="box">
                  <div class="left">
                    <span>{{ subitem.aut_name }}</span>
                    <span>{{ subitem.comm_count }} 评论</span>
                    <span>{{ subitem.pubdate | timefilter }}</span>
                  </div>
                  <div class="right">
                    <van-icon @click="openMore(subitem)" name="ellipsis"></van-icon>
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="tabBtn" @click="$refs.channels.show = true">
      <van-icon name="wap-nav" />
    </div>
    <!-- 频道弹出层 -->
    <channels :active.sync="active" :channels="channels" ref="channels" />
    <!-- 更多操作弹出层 -->
    <more  @dislike="dislike" :autId="autId" :artId="artId" ref="more" />
  </div>
</template>

<script>
import { apiGetChannels } from '@/api/index.js'
import { apiGetArticleList, apiDisLikes } from '@/api/article'
import { localGet } from '@/utils/mylocal'
import channels from './com/channels'
import more from './com/more'
export default {
  data () {
    return {
      // 当前频道
      active: 0,
      // 频道列表
      channels: [],
      // 文章id
      artId: 0,
      // 作者id
      autId: 0
    }
  },
  methods: {
    async getChannels () {
      const token = this.$store.state.userInfo.token
      if (token) {
        const res = await apiGetChannels()
        this.channels = res.data.data.channels
      } else {
        const localChannel = localGet('channels')
        if (localChannel) {
          this.channels = localChannel
        } else {
          const res = await apiGetChannels()
          this.channels = res.data.data.channels
        }
      }
      this.addOtherProp()
    },
    addOtherProp () {
      this.channels.forEach(item => {
        this.$set(item, 'articleList', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
      })
    },
    async onLoad () {
      console.log('onLoad')
      const currentChannel = this.channels[this.active]
      const id = currentChannel.id
      const res = await apiGetArticleList(id)
      currentChannel.articleList = [...currentChannel.articleList, ...res.data.data.results]
      currentChannel.loading = false
      if (res.data.data.results.length === 0) {
        currentChannel.finished = true
      }
    },
    async onRefresh () {
      const currentChannel = this.channels[this.active]
      const id = currentChannel.id
      const res = await apiGetArticleList(id)
      currentChannel.articleList = res.data.data.results
      currentChannel.loading = false
      currentChannel.isLoading = false
    },
    openMore (item) {
      this.$refs.more.show = true
      this.artId = item.art_id
      this.autId = item.aut_id
    },
    async dislike (id) {
      try {
        this.channels[this.active].articleList.forEach((item, index) => {
          if (item.artId === id) {
            this.channels[this.active].articleList.splice(index, 1)
          }
        })
        await apiDisLikes(id)
      } catch (err) {
        this.$toast(err)
      }
      this.show = false
    }
  },
  mounted () {
    this.getChannels()
  },
  components: {
    channels,
    more
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-bottom: 50px;
  margin-top: 46px;
  background-color: #f2f6fc;
  .l-title {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff
    }
  }
  .tabBtn {
    position: fixed;
    right: 0;
    top: 46px;
    width: 12%;
    height: 44px;
    background-color: #f3f3f3;
    text-align: center;
    line-height: 54px;
    font-size: 28px;
  }
  /deep/ .van-tabs__nav {
    width: 88%;
  }
  .box {
    display: flex;
    justify-content: space-between;
    .right {
      font-size: 20px;
    }
    .left {
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
