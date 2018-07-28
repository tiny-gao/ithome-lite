import wx from 'wx'
import Fly from 'flyio'
import store from '@/store'
const request = new Fly()

request.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()
  return request
})
request.interceptors.request.use((config) => {
  config.headers['token'] = store.state.token
  return config
})
request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    if (response.data.code === 40002) {
      store.state.hasBind = false
      store.state.clockIn = false
      store.state.token = ''
      wx.switchTab({
        url: '../profile/index',
        success: function () {
          wx.showToast({
            title: response.data.msg,
            icon: 'none'
          })
        }
      })
    }
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.response.data.error,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
