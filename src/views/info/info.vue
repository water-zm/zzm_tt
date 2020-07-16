<template>
  <div class="info">
    <van-nav-bar title="个人信息" @click-left="$router.back()" @click-right="submit" fixed left-arrow class="l-title">
        <template #right>
            <span class="sub">保存</span>
        </template>
    </van-nav-bar>
    <van-cell-group class="mid">
        <van-cell @click="$refs.photo.show = true" title="头像" is-link>
            <template #default>
                <img class="img" :src="userInfo.photo">
            </template>
        </van-cell>
        <van-cell @click="showName = true" title="昵称" is-link>
            <template #default>
                <span>{{ userInfo.name }}</span>
            </template>
        </van-cell>
    </van-cell-group>
    <van-cell-group>
        <van-cell @click="showIntro = true" title="介绍" is-link>
            <template #default>
                <span>{{ userInfo.intro === '' ? '无' : userInfo.intro }}</span>
            </template>
        </van-cell>
        <van-cell @click="showGender = true" title="性别" is-link>
            <template #default>
                <span>{{ userInfo.gender === 0 ? '男' : '女'}}</span>
            </template>
        </van-cell>
        <van-cell @click="showDate = true" title="生日" is-link>
            <template #default>
                <span>{{ userInfo.birthday === '' ? '无' : userInfo.birthday }}</span>
            </template>
        </van-cell>
    </van-cell-group>
    <!-- 头像弹出 -->
    <photo @updatePhoto="updatePhoto" ref="photo" />
    <!-- 昵称弹出 -->
    <van-popup v-model="showName" position="bottom" round :style="{ height: '15%' }">
        <van-field v-model="userInfo.name" label="昵称" class="fie" placeholder="请输入昵称" maxlength="7"  show-word-limit required />
    </van-popup>
    <!-- 介绍弹出 -->
    <van-popup v-model="showIntro" position="bottom" round :style="{ height: '15%' }">
        <van-field v-model="userInfo.intro" label="介绍" class="fie" placeholder="请输入介绍" maxlength="10"  show-word-limit required />
    </van-popup>
    <!-- 性别弹出 -->
    <van-popup v-model="showGender" position="bottom" round :style="{ height: '30%' }">
        <van-picker
        title="请选择您的性别"
        show-toolbar
        :columns="columns"
        @confirm="onGender"
        @cancel="showGender = false"
        item-height="35"
        />
    </van-popup>
    <!-- 性别弹出 -->
    <van-popup v-model="showDate" position="bottom" round :style="{ height: '40%' }">
        <van-datetime-picker
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onDate"
        />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import photo from './com/photo'
import { apiGetUser, apiGetUserProfile, apiUpdateUser } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {},
      showName: false,
      showIntro: false,
      showGender: false,
      showDate: false,
      columns: ['男', '女'],
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2021, 0, 1)
    }
  },
  methods: {
    onGender (value, index) {
      this.userInfo.gender = index
      this.showGender = false
    },
    onDate (value) {
      this.userInfo.birthday = dayjs(value).format('YYYY-MM-DD')
      this.showDate = false
    },
    async submit () {
      await apiUpdateUser(this.userInfo)
    },
    updatePhoto (photo) {
      this.userInfo.photo = photo
    }
  },
  async created () {
    const res1 = await apiGetUser()
    this.$set(this.userInfo, 'name', res1.data.data.name)
    this.$set(this.userInfo, 'intro', res1.data.data.intro)
    this.$set(this.userInfo, 'photo', res1.data.data.photo)
    this.$store.state.userPhoto = res1.data.data.photo
    const res2 = await apiGetUserProfile()
    this.$set(this.userInfo, 'gender', res2.data.data.gender)
    this.$set(this.userInfo, 'birthday', res2.data.data.birthday)
  },
  components: {
    photo
  }
}
</script>

<style lang="less" scoped>
.info {
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
    .sub {
        color: #fff;
    }
  }
  .mid {
      margin-top: 56px;
      margin-bottom: 10px;
      .img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
  }
  .fie {
      margin-top: 25px;
  }
}
</style>
