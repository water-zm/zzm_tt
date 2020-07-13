<template>
  <div class="detail">
      <!-- 头部 -->
    <van-nav-bar title="文章详情" @click-left="back" fixed left-arrow class="l-title" />
    <!-- 标题 作者 -->
    <van-cell>
      <template #title>
        <h1 class="title">{{ detailObj.title }}</h1>
        <div class="box">
          <div class="left">
            <div class="img">
              <img :src="detailObj.aut_photo" alt />
            </div>
          </div>
          <div class="main">
            <div>{{ detailObj.aut_name }}</div>
            <div>{{ detailObj.pubdate | timefilter}}</div>
          </div>
          <div class="right">
            <van-button v-if="detailObj.is_followed" @click="unfollow(detailObj.aut_id)" type="info">已关注</van-button>
            <van-button v-else @click="follow(detailObj.aut_id)" type="info"><van-icon name="plus" />关注</van-button>
          </div>
        </div>
      </template>
    </van-cell>
    <!-- 文章内容 -->
    <van-cell>
        <template #title>
            <div v-html="detailObj.content"></div>
        </template>
    </van-cell>
    <!-- 按钮 -->
    <van-cell>
        <template #title>
           <div class="likes">
            <van-button @click="dislikings" v-if="detailObj.attitude === 1" plain round type="danger"><van-icon name="like-o" /> 点赞</van-button>
            <van-button @click="likings" v-else plain round type="default"><van-icon name="like-o" /> 点赞</van-button>
            <van-button @click="dislike" v-if="detailObj.attitude === 0"  plain round type="danger"><van-icon name="delete" /> 不喜欢</van-button>
            <van-button @click="like" v-else  plain round type="default"><van-icon name="delete" /> 不喜欢</van-button>
           </div>
        </template>
    </van-cell>
    <!-- 评论 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <comment :item="item" v-for="(item, index) in commentList" :key="index" />
    </van-list>
    <!-- 评论框 -->
    <write />
  </div>
</template>

<script>
import { apifollow, apiunfollow } from '@/api/user'
import { apiGetArticles, apiLikings, apiDisLikings, apiLike, apiDisLike } from '@/api/article'
import { apiGetComment } from '@/api/comment'
import comment from './com/comment'
import write from './com/write'
export default {
  data () {
    return {
      artId: this.$route.params.artid,
      loading: false,
      finished: false,
      offset: null,
      endid: null,
      limit: 10,
      commentList: [],
      detailObj: {}
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async onLoad () {
      const res = await apiGetComment({
        artId: this.artId,
        offset: this.offset,
        limit: this.limit
      })
      console.log(res)
      this.commentList = [...this.commentList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      this.loading = false
      if (this.endid === this.offset) {
        this.finished = true
      }
    },
    // 关注
    async follow (autId) {
      await apifollow(autId)
      this.detailObj.is_followed = true
    },
    // 取关
    async unfollow (autId) {
      await apiunfollow(autId)
      this.detailObj.is_followed = false
    },
    // 点赞
    async likings () {
      await apiLikings(this.artId)
      this.detailObj.attitude = 1
    },
    // 取消点赞
    async dislikings () {
      await apiDisLikings(this.artId)
      this.detailObj.attitude = -1
    },
    // 取消不喜欢
    async like () {
      await apiLike(this.artId)
      this.detailObj.attitude = 0
    },
    // 不喜欢
    async dislike () {
      await apiDisLike(this.artId)
      this.detailObj.attitude = -1
    }
  },
  async created () {
    const res = await apiGetArticles(this.artId)
    this.detailObj = res.data.data
  },
  components: {
    comment,
    write
  }
}
</script>

<style lang="less" scoped>
.detail {
  margin-bottom: 54px;
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
  .title {
    text-align: center;
    padding: 0 10px;
  }
  .box {
    display: flex;
    .left {
      .img {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .main {
      flex: 1;
    }
  }
  .likes {
      display: flex;
      justify-content: space-around;
  }
}
</style>
