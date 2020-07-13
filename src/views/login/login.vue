<template>
  <div class='login'>
    <van-nav-bar title="登录" class="l-title" />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field :rules="rules.mobile" v-model="user.mobile" placeholder="请输入手机号">
          <template #left-icon>
              <span class="iconfont icon-iphone"></span>
          </template>
        </van-field>
        <van-field :rules="rules.code" v-model="user.code" placeholder="请输入验证码">
          <template #left-icon>
              <span class="iconfont icon-yanzhengma"></span>
          </template>
          <template #right-icon>
              <span class="iconfont icon-tubiaozhizuo-"></span>
          </template>
          <template #button>
              <van-button native-type="button" size="small" class="codeBtn" round>发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="l-btn">
        <van-button :loading="isLoading" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { toLogin } from '@/api/user'
import { localSet } from '@/utils/mylocal'
export default {
  data () {
    return {
      user: {
        mobile: '13111111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位数的验证码' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      try {
        const res = await toLogin(this.user)
        localSet(res.data.data)
        this.$store.commit('setUserInfo', res.data.data)
        if (this.$route.path === '/login') {
          this.$router.push('/home')
        } else {
          this.$router.back()
        }
      } catch (err) {
        this.$toast.fail('失败文案')
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #F2F6FC;
  .l-title {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
  .l-btn {
    margin: 20px;
  }
  .codeBtn {
    background-color: #ededed;
    /deep/ .van-button__text {
      color: #666;
    }
  }
}
</style>
