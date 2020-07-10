<template>
  <div class="detail">
      <!-- 头部 -->
    <van-nav-bar title="文章详情" @click-left="back" fixed left-arrow class="l-title" />
    <!-- 标题 作者 -->
    <van-cell>
      <template #title>
        <h2 class="title">标题</h2>
        <div class="box">
          <div class="left">
            <div class="img">
              <img src="http://img3.imgtn.bdimg.com/it/u=3773584324,1413178473&fm=26&gp=0.jpg" alt />
            </div>
          </div>
          <div class="main">
            <div>名字</div>
            <div>2 年内</div>
          </div>
          <div class="right">
            <van-button type="info">
              <van-icon name="plus" />关注
            </van-button>
          </div>
        </div>
      </template>
    </van-cell>
    <!-- 文章内容 -->
    <van-cell>
        <template #title>
            <div>文章啊啊啊啊</div>
            <div>文章啊啊啊啊</div>
            <div>文章啊啊啊啊</div>
            <div>文章啊啊啊啊</div>
        </template>
    </van-cell>
    <!-- 按钮 -->
    <van-cell>
        <template #title>
           <div class="likes">
                <van-button plain round type="default">
              <van-icon name="like-o" /> 喜欢
            </van-button>
            <van-button plain round type="default">
              <van-icon name="delete" /> 不喜欢
            </van-button>
           </div>
        </template>
    </van-cell>
    <!-- 评论 -->
    <comment />
    <!-- 评论框 -->
    <write />
  </div>
</template>

<script>
import comment from './com/comment'
import write from './com/write'
export default {
  methods: {
    back () {
      this.$router.back()
    }
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
