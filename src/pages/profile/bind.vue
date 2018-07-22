<template lang="pug">
  view(class="container")
    view(class="page-head")
      view(class="page-head-title") 微信账号绑定
      view(class="page-head-line")
      view(class="page-head-desc") EPS为系统内部账号，小程序需填写内部登录账号与微信账号进行关联

    view(class='page-body')
      form(catchsubmit="formSubmit" catchreset="formReset")
        view(class="page-section")
          view(class="weui-cells__title") 账号
          view(class="weui-cells weui-cells_after-title")
            view(class="weui-cell weui-cell_input")
               input(class="weui-input"  name="mobileNum" placeholder="手机号码")
        view(class="page-section")
          view(class="weui-cells__title") 密码
          view(class="weui-cells weui-cells_after-title")
            view(class="weui-cell weui-cell_input")
               input(class="weui-input"  password type="text" placeholder="密码")
        view(class="btn-area")
          button(type="primary" formType="submit") 提交
          button(formType="reset") 重置
      </view>
</template>
<script>
  import wx from 'wx'
  import store from '@/store'
  export default {
    data () {
      return {
        hasUserInfo: false,
        hasBind: false,
        userInfo: {
        }
      }
    },
    methods: {
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
          wx.getUserInfo({
            success: function (res) {
              console.info('hha')
              console.info(that.hasUserInfo)
              that.hasUserInfo = true
              that.userInfo = res.userInfo
              console.info(that.userInfo)
            }
          })
        }
      },
      clear () {
        var that = this
        that.hasUserInfo = false
        that.hasBind = false
        that.userInfo = {}
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
