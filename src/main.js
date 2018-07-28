import Vue from 'vue'
import store from '@/store/index'
import App from '@/App'
import MpvueRouterPatch from 'mpvue-router-patch'
import wx from 'wx'
Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)
Vue.use(wx)
const app = new Vue({
  store,
  ...App
})
app.$mount()
var EventEmitter = require('events').EventEmitter
var ee = new EventEmitter()
ee.setMaxListeners(0)

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/news/list'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#d22222',
      backgroundColorTop: '#d22222',
      navigationBarBackgroundColor: '#d22222',
      navigationBarTitleText: 'EPS',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#999',
      selectedColor: '#d22222',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/news/list',
          text: '打卡',
          iconPath: 'static/images/home.png',
          selectedIconPath: 'static/images/home-actived.png'
        }, {
          pagePath: 'pages/task/list',
          text: '任务',
          iconPath: 'static/images/note.png',
          selectedIconPath: 'static/images/note-actived.png'
        },
        {
          pagePath: 'pages/profile/index',
          text: '我的',
          iconPath: 'static/images/profile.png',
          selectedIconPath: 'static/images/profile-actived.png'
        }]
    }
  }
}
