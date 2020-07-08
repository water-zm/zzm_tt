<template>
  <div class="index">
    <van-nav-bar title="首页" fixed class="l-title" />
    <van-tabs v-model="active" sticky offset-top="46px">
      <van-tab v-for="(item, index) in channels" :key="index" :title="item.name">
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="mycell" v-for="(subitem, subindex) in item.articleList" :key="subindex" :title="subitem.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="tabBtn" @click="$refs.channels.show = true">
      <van-icon name="wap-nav" />
    </div>
    <!-- 频道弹出层 -->
    <channels :active.sync="active" :channels="channels" ref="channels" />
  </div>
</template>

<script>
import { apiGetChannels } from '@/api/index.js'
import { apiGetArticleList } from '@/api/article'
import { localGet } from '@/utils/mylocal'
import channels from './com/channels'
export default {
  data () {
    return {
      active: 0,
      channels: []
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
    }
  },
  mounted () {
    this.getChannels()
  },
  components: {
    channels
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
  .mycell {
    height: 100px;
  }
}
</style>
