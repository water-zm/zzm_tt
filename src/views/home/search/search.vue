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
    <van-cell-group v-if="suggestionList.length != 0">
      <van-cell title="联想区域" />
      <van-cell @click="onSearch(item.item)" v-for="(item, index) in suggestionList" :key="index" icon="search">
        <template #title>
          <div v-html="item.htmlItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template #default>
          <van-icon @click="delAll" name="delete" />
        </template>
      </van-cell>
      <van-cell @click="onSearch(item)" v-for="(item, index) in historyList" :key="index" icon="search" :title="item">
        <template #default>
          <van-icon @click.stop="del(index)" name="clear" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSuggestion } from '@/api/search'
import { localSet, localGet, localDel } from '@/utils/mylocal'
export default {
  data () {
    return {
      value: '',
      suggestionList: [],
      timer: null,
      historyList: localGet('history') || []
    }
  },
  methods: {
    onSearch (val) {
      this.$router.push(`/searchResult/${val}`)
      this.historyList.unshift(val)
      this.historyList = [...new Set(this.historyList)]
      localSet(this.historyList, 'history')
    },
    onCancel () {
      this.$toast('取消')
    },
    onInput (val) {
      if (val.trim().length === 0) {
        this.suggestionList = []
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const res = await apiSuggestion(val)
        this.suggestionList = res.data.data.options
        this.suggestionList = this.suggestionList.map(item => {
          return {
            htmlItem: item.replace(val, `<span style="color: #858585">${val}</span>`),
            item: item
          }
        })
      }, 500)
    },
    del (index) {
      this.historyList.splice(index, 1)
      localSet(this.historyList, 'history')
    },
    delAll () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否清空历史记录'
      })
        .then(() => {
          // on confirm
          this.historyList = []
          localDel('history')
        })
        .catch(() => {
          // on cancel
        })
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
