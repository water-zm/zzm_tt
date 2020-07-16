<template>
  <div class="robot">
    <van-nav-bar title="智能小Z" @click-left="$router.back()" fixed left-arrow class="l-title" />
    <div class="middle">
      <div v-for="(item, index) in charArr" :key="index" class="item">
        <img :class="{ usercontent: item.isRobot === false}" :src="item.isRobot === false? $store.state.userPhoto : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594645595880&di=58ec3fae44be809149c77ef562b3e5dd&imgtype=0&src=http%3A%2F%2Fattachment.jmw.com.cn%2Fcomp_uploadfile%2Fslt%2F2016%2F01%2F13%2Fs1_21781452657049.jpg'" />
        <div :class="{ usercontent: item.isRobot === false}" class="content">{{ item.msg }}</div>
      </div>
    </div>
    <van-search v-model="value" @search="onSearch" show-action class="myinp" shape="round" background="#99ccff" left-icon="">
        <template #action>
            <van-button class="mybtn" type="info">发送</van-button>
        </template>
    </van-search>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      value: '',
      charArr: [
        { msg: '我是小Z', isRobot: true }
      ],
      socket: null
    }
  },
  methods: {
    onSearch (val) {
      if (this.value.trim().length === 0) {
        return
      }
      this.charArr.push({
        msg: this.value,
        isRobot: false
      })
      this.socket.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
      this.value = ''
    }
  },
  created () {
    this.socket = io(`http://ttapi.research.itcast.cn?token=${this.$store.state.userInfo.token}`)
    this.socket.on('message', data => {
      this.charArr.push({
        msg: data.msg,
        isRobot: true
      })
    })
  }
}
</script>

<style lang="less" scoped>
.robot {
  .l-title {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
    .sub {
        color: #fff;
    }
  }
  .middle {
    width: 100%;
    position: fixed;
    top: 46px;
    bottom: 54px;
    .item {
      overflow: hidden;
      margin: 10px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        float: left;
      }
      .content {
        float: left;
        max-width: 70%;
        margin-left: 10px;
        background-color: #cecece;
        padding: 8px;
        border-radius: 8px;
      }
      .userimg {
        float: right;
      }
      .usercontent {
        float: right;
        margin-right: 0px;
        margin-left: 10px;
      }
    }
  }
  .myinp {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .mybtn {
    height: 34px;
    box-sizing: border-box;
    background-color: #0094ff;
    border: none;
    }
  }
}
</style>
