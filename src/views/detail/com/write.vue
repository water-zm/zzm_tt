<template>
  <div class="write">
      <van-search
    v-model="value"
    show-action
    left-icon=""
    placeholder="发表评论"
    @search="onSearch"
    @cancel="onCancel"
    background="#e9ebec"
    shape="round"
    class="search"
  >
    <template #action>
        <van-button type="info">发送</van-button>
    </template>
  </van-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(val)
    },
    onCancel () {
      this.$toast('取消')
    }
  }
}
</script>

<style lang="less" scoped>
.write {
    .search {
        position: fixed;
        bottom: 0;
        width: 100%;
        .van-button {
            height: 35px;
        }
    }
}
</style>
