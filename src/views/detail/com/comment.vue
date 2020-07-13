<template>
  <div class="comment">
    <van-cell>
      <template #title>
        <div class="box">
          <div class="left">
            <div class="img">
              <img :src="item.aut_photo" />
            </div>
          </div>
          <div class="main">
            <div class="aname">{{ item.aut_name }}</div>
            <div class="cont">{{ item.content }}</div>
            <div class="info">
              <span>{{ item.pubdate | timefilter }}</span>
              <span @click="reply">回复 {{ item.reply_count }}</span>
            </div>
          </div>
          <div class="right">
            <van-icon
              @click="unliking(item)"
              v-if="item.is_liking"
              class="red"
              name="like"
            > {{ item.like_count }}</van-icon>
            <van-icon @click="liking(item)" v-else name="like-o"> {{ item.like_count }}</van-icon>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import bus from '@/utils/mybus'
import { apiLikingsComm, apiUnLikingsComm } from '@/api/comment'
export default {
  props: ['item'],
  data () {
    return {
    }
  },
  methods: {
    reply () {
      bus.$emit('passval', this.item)
      this.$parent.$parent.$refs.reply.show = true
    },
    async liking (item) {
      const res = await apiLikingsComm(item.com_id)
      console.log(res)
      item.is_liking = true
      item.like_count++
    },
    async unliking (item) {
      const res = await apiUnLikingsComm(item.com_id)
      console.log(res)
      item.is_liking = false
      item.like_count--
    }
  },
  created () {
    console.log(this.item)
  }
}
</script>

<style lang="less" scoped>
.comment {
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
      .aname {
        font-size: 16px;
        color: #0099f4;
      }
      .cont {
        text-indent: 1.5em;
        padding: 4px 0;
      }
      .info {
        font-size: 12px;
        span {
          &:nth-child(2) {
            background-color: #ededed;
            padding: 3px 5px;
            color: #656565;
            border-radius: 18px;
            margin-left: 3px;
          }
        }
      }
    }
  }
  .red {
    color: #f99;
  }
}
</style>
