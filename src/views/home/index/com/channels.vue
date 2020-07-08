<template>
  <div class="channels">
    <van-popup v-model="show" position="bottom" :style="{ height: '75%' }">
        <van-cell title="我的频道">
            <template #default>
                <van-button v-if="cross===false" @click="cross=true" type="danger" plain round size="mini">编辑</van-button>
                <van-button v-else @click="cross=false" type="danger" plain round size="mini">完成</van-button>
            </template>
        </van-cell>
        <van-grid>
            <van-grid-item v-for="(item, index) in channels" :key="index" class="itemf" >
                <template #default>
                    <span @click="clickChannel(index)" class="myword" :class="{ active: active==index }">{{ item.name }}</span>
                    <van-icon @click="delChannel(index)" v-if="cross===true && index !== 0" class="items" name="clear" />
                </template>
            </van-grid-item>
        </van-grid>
        <van-cell title="频道推荐"></van-cell>
        <van-grid>
            <van-grid-item @click="addChannel(item)" v-for="(item, index) in filterChannel" :key="index" :text="item.name" />
        </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { apiGetAllChannel, processChannel } from '@/api/index'
import { localSet } from '@/utils/mylocal'
export default {
  props: ['channels', 'active'],
  data () {
    return {
      show: false,
      allChannel: [],
      cross: false
    }
  },
  methods: {
    async getAllChannel () {
      const res = await apiGetAllChannel()
      this.allChannel = res.data.data.channels
      console.log(res)
    },
    async delChannel (index) {
      this.channels.splice(index, 1)
      // 删除频道，调整选中频道
      if (this.active > index) {
        this.clickChannel(this.active - 1)
      }
      const token = this.$store.state.userInfo.token
      if (!token) {
        localSet(this.channels, 'channels')
      } else {
        var newArr = this.channels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await processChannel(newArr)
      }
    },
    async addChannel (item) {
      this.$set(item, 'articleList', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      this.channels.push(item)
      const token = this.$store.state.userInfo.token
      if (!token) {
        localSet(this.channels, 'channels')
      } else {
        var newArr = this.channels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await processChannel(newArr)
      }
    },
    clickChannel (index) {
      this.$emit('update:active', index)
    }
  },
  created () {
    this.getAllChannel()
  },
  computed: {
    filterChannel () {
      const ids = this.channels.map(item => item.id)
      const newArr = this.allChannel.filter(item => !ids.includes(item.id))
      return newArr
    }
  }
}
</script>

<style lang="less" scoped>
.itemf {
    position: relative;
    .myword {
        color: #646566;
        font-size: 12px;
    }
    .items {
        position: absolute;
        right: 0;
        top: 0;
        color: #666;
        font-size: 12px;
    }
    .active {
        color: red;
    }
}
</style>
