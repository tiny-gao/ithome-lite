import Vue from 'vue'
import store from '@/store'
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

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/profile/index'
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
          pagePath: 'pages/profile/index',
          text: '我的',
          iconPath: 'static/images/profile.png',
          selectedIconPath: 'static/images/profile-actived.png'
        },
        {
          pagePath: 'pages/news/list',
          text: '咨询1',
          iconPath: 'static/assets/news.png',
          selectedIconPath: 'static/assets/news-active.png'
        }, {
          pagePath: 'pages/quanzi/list',
          text: '2222',
          iconPath: 'static/assets/quanzi.png',
          selectedIconPath: 'static/assets/quanzi-active.png'
        }]
    }
  }
}
