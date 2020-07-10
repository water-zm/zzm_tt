<template>
  <div class="comment">
      <van-cell v-for="(item, index) in 8" :key="index">
          <template #title>
            <div class="box">
            <div class="left">
                <div class="img">
                <img src="http://b-ssl.duitang.com/uploads/item/201805/18/20180518134730_vnJXa.thumb.700_0.jpeg" alt />
                </div>
            </div>
            <div class="main">
                <div class="name">名字</div>
                <div class="cont">内容</div>
                <div class="info">
                    <span>六个月内 </span>
                    <span>回复 0</span>
                </div>
            </div>
            <div class="right">
                <van-icon name="like-o" /> 0
            </div>
            </div>
          </template>
      </van-cell>
  </div>
</template>

<script>
export default {

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
