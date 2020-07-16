<template>
  <div class="my">
    <div class="header">
      <div class="user" @click="$router.push('/info')">
        <img
          class="photo"
          :src="user.photo"
        />
        <div class="info">
          <div class="name">{{ user.name }}</div>
          <div class="intro">{{ user.intro }}</div>
        </div>
        <div class="time">
          <div>今日阅读</div>
          <div>0 分钟</div>
        </div>
      </div>
      <div class="detail">
        <div class="publish">
          <div>{{ user.art_count }}</div>
          <div>动态</div>
        </div>
        <div class="follow">
          <div>{{ user.follow_count }}</div>
          <div>关注</div>
        </div>
        <div class="fans">
          <div>{{ user.fans_count }}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="orders-o" text="作品" />
    </van-grid>
    <van-cell-group>
      <van-cell @click="$router.push('/info')" title="修改资料" is-link />
      <van-cell title="消息通知" is-link />
      <van-cell @click="$router.push('/robot')" title="智能小Z" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { apiGetUser } from '@/api/user'
export default {
  data () {
    return {
      user: {}
    }
  },
  async created () {
    const res = await apiGetUser()
    // console.log(res)
    this.user = res.data.data
  }
}
</script>

<style lang="less" scoped>
.my {
  .header {
    height: 190px;
    background-color: #3e9df8;
    overflow: hidden;
    color: #fff;
    .user {
      display: flex;
      margin-top: 40px;
      margin-left: 30px;
      .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-left: 15px;
        .name {
          font-size: 16px;
        }
        .intro {
          font-size: 12px;
          margin-top: 10px;
          text-indent: 1em;
        }
      }
      .time {
        padding: 3px 12px;
        padding-right: 8px;
        height: 38px;
        font-size: 12px;
        text-align: center;
        border-radius: 24px 0 0 24px;
        background-color: rgba(0, 0, 0, 0.4);
        div {
          line-height: 20px;
        }
      }
    }
    .detail {
      display: flex;
      justify-content: space-around;
      margin-top: 25px;
      font-size: 12px;
      text-align: center;
      > div {
        width: 75px;
        height: 50px;
        line-height: 25px;
      }
    }
  }
}
</style>
