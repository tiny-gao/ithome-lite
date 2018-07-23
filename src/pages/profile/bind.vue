<template lang="pug">
  view(class="container")
    view(class="page-head")
      view(class="page-head-title") 微信账号绑定
      view(class="page-head-line")
      view(class="page-head-desc") EPS为系统内部账号，小程序需填写内部登录账号与微信账号进行关联

    view(class='page-body')
      form(@submit="formSubmit" :model="addForm" catchreset="formReset")
        view(class="page-section")
          view(class="weui-cells__title") 账号
          view(class="weui-cells weui-cells_after-title")
            view(class="weui-cell weui-cell_input")
               input(class="weui-input"  v-model="addForm.mobileNum" placeholder="手机号码")
        view(class="page-section")
          view(class="weui-cells__title") 密码
          view(class="weui-cells weui-cells_after-title")
            view(class="weui-cell weui-cell_input")
               input(class="weui-input"  password type="text" v-model="addForm.password" placeholder="密码")
        view(class="btn-area")
          button(type="primary" @click.native="editSubmit" formType="submit") 提交
          button(formType="reset") 重置
      </view>
</template>
<script>
  import wx from 'wx'
  import store from '@/store'
  import api from '@/utils/api'

  export default {
    data () {
      return {
        addForm: {
          mobileNum: '',
          password: ''
        }
      }
    },
    methods: {
      formSubmit: function (e) {
        var that = this
        wx.login({
          success: function (res) {
            if (res.code) {
              var loginParams = { mobileNum: that.addForm.mobileNum, password: that.addForm.password, code: res.code }
              console.info(loginParams)
              api.getWxSns(loginParams).then(result => {
                console.info('进行token设置', result)
                if (result.code !== 200) {
                  wx.showToast({
                    title: result.msg,
                    icon: 'none'
                  })
                } else {
                  store.state.token = result.data.token
                  store.state.hasBind = true
                  store.state.mobileNum = that.addForm.mobileNum
                  wx.showToast({
                    title: '绑定成功!',
                    icon: 'success',
                    complete: function (res) {
                      wx.reLaunch({ url: './index' })
                    }
                  })
                }
              })
            }
          }
        })
      },
      getUserInfo () {
        var that = this
        if (store.state.hasLogin === false) {
          wx.login({
            success: _getUserInfo
          })
        } else {
          _getUserInfo()
        }

        function _getUserInfo () {
          store.state.hasLogin = true
          wx.getUserInfo({
            success: function (res) {
              store.state.hasUserInfo = true
              store.state.userInfo = res.userInfo
              console.info(that.userInfo)
            }
          })
        }
      },
      clear () {
        store.state.hasLogin = false
        store.state.hasBind = false
        store.state.hasUserInfo = false
        store.state.userInfo = {}
      }
    }
  }
</script>
<style src="@/styles/weui.wxss"></style>
<style>
  .page-section{
    margin-bottom: 20rpx;
  }
</style>
