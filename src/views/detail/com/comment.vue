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
                <div class="name">{{ item.aut_name }}</div>
                <div class="cont">{{ item.content }}</div>
                <div class="info">
                    <span>{{ item.pubdate | timefilter }}</span>
                    <span>回复 {{ item.reply_count }}</span>
                </div>
            </div>
            <div class="right">
                <van-icon name="like-o" /> {{ item.like_count }}
            </div>
            </div>
          </template>
      </van-cell>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
    }
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
      .name {
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
}
</style>
