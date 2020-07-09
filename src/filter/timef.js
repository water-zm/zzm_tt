import Vue from 'vue'
import dayjs from 'dayjs'
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入中文语言包
import 'dayjs/locale/zh-cn'
// 将插件使用到 dayjs 中
dayjs.extend(relativeTime)
// 全局使用语言包
dayjs.locale('zh-cn')

Vue.filter('timefilter', function (val) {
  return dayjs().from(val)
})
