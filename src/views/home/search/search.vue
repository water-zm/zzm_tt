<template>
  <div class="search">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
        background="#3e9df8"
        shape="round"
      />
    </form>
    <!-- 联想区域 -->
    <van-cell-group v-if="show == true">
      <van-cell title="联想区域" />
      <van-cell v-for="(item, index) in suggestionList" :key="index" icon="search" :title="item" />
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template #default>
          <van-icon name="delete" />
        </template>
      </van-cell>
      <van-cell icon="search" title="程序员为什么XXX">
        <template #default>
          <van-icon name="clear" />
        </template>
      </van-cell>
      <van-cell icon="search" title="程序员为什么XXX">
        <template #default>
          <van-icon name="clear" />
        </template>
      </van-cell>
      <van-cell icon="search" title="程序员为什么XXX">
        <template #default>
          <van-icon name="clear" />
        </template>
      </van-cell>
      <van-cell icon="search" title="程序员为什么XXX">
        <template #default>
          <van-icon name="clear" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSuggestion } from '@/api/search'
export default {
  data () {
    return {
      value: '',
      show: false,
      suggestionList: [],
      timer: null
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(val)
      this.$router.push(`/searchResult/${val}`)
    },
    onCancel () {
      this.$toast('取消')
    },
    onInput (val) {
      if (val.trim().length !== 0) {
        this.show = true
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const res = await apiSuggestion(val)
          this.suggestionList = res.data.data.options
        }, 500)
      } else {
        this.suggestionList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: #3e9df8;
    color: #ededed;
  }
}
</style>
