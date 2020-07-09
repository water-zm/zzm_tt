<template>
  <div class="result">
    <van-nav-bar title="搜索结果" fixed left-arrow class="l-title" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4>标题</h4>
            <van-grid :border="false" :column-num="3">
              <van-grid-item>
                <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              </van-grid-item>
              <van-grid-item>
                <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              </van-grid-item>
              <van-grid-item>
                <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
              </van-grid-item>
            </van-grid>
            <van-grid direction="horizontal" :column-num="3">
              <van-grid-item icon="photo-o" text="文字" />
              <van-grid-item icon="photo-o" text="文字" />
              <van-grid-item icon="photo-o" text="文字" />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      isLoading: false,
      finished: true
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  margin-bottom: 50px;
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
}
</style>
