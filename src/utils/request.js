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
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
