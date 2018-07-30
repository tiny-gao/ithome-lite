<template lang="pug">
view(class='container')
  view(class='page-body')
    view(class='page-body-info')
      view(class='page-body-title') 用户信息
      block(v-if="hasUserInfo")
        image(class="userinfo-avatar" v-bind:src="userInfo.avatarUrl")
        text(class="userinfo-nickname") {{userInfo.nickName}}
        text(class="page-body-text" v-if='hasBind') 已与EPS账号`{{mobileNum}}`绑定
      block(v-if="!hasUserInfo")
        text(class='page-body-text') 未获取
        text(class='page-body-text') 点击绿色按钮获取用户头像和昵称
    view(class="btn-area")
        button(v-on:click='getUserInfo' type='primary' v-if="!hasUserInfo" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo") 获取用户信息
        navigator(url="bind" hover-class="navigator-hover")
          button(type="primary" v-if='!hasBind && hasUserInfo') 绑定EPS系统账号
        button(v-if='hasBind' v-on:click='unBind') 解除绑定EPS系统账号
</template>

<script>
  import wx from 'wx'
  import api from '@/utils/api'
  import { mapState } from 'vuex'
  import store from '@/store'
  export default {
    data () {
      return {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'hasLogin',
        'hasBind',
        'hasUserInfo',
        'mobileNum',
        'token'
      ])
    },
    methods: {
      getUserInfo () {
        var that = this
        if (that.hasLogin === false) {
          wx.login({
            success: _getUserInfo
          })
        } else {
          _getUserInfo()
        }

        function _getUserInfo (login) {
          wx.getUserInfo({
            success: function (res) {
              // 如果有绑定过，则刷新状态信息
              api.getEpsToken(login.code).then(result => {
                if (result.data) {
                  store.state.token = result.data.token
                  store.state.hasBind = true
                  store.state.mobileNum = result.data.mobileNum
                } else {
                  store.state.token = ''
                  store.state.hasBind = false
                  store.state.mobileNum = ''
                }
              })
              store.state.hasUserInfo = true
              store.state.hasLogin = true
              store.state.userInfo = res.userInfo
            }
          })
        }
      },
      unBind () {
        api.unBind().then(result => {
          if (result.code !== 200) {
            wx.showToast({
              title: result.msg,
              icon: 'none'
            })
          } else {
            store.state.token = ''
            store.state.hasBind = false
            store.state.clockIn = false
            store.state.mobileNum = ''
            store.state.token = ''
            wx.showToast({
              title: '解绑成功!'
            })
          }
        })
      },
      clearData () {
        store.state.hasLogin = false
        store.state.hasBind = false
        store.state.hasUserInfo = false
        store.state.userInfo = {}
        store.state.clockIn = false
        store.state.mobileNum = ''
        store.state.token = ''
      },
      clear () {
        let that = this
        wx.showModal({
          title: '警告',
          content: '清除会解除绑定和清空此程序的用户数据',
          cancelText: '取消',
          confirmText: '确定',
          icon: 'WARN',
          success: function (res) {
            if (res.confirm) {
              if (that.hasBind) {
                that.unBind()
              }
              that.clearData()
              wx.showToast({
                title: '清除成功!'
              })
            } else if (res.cancel) {
            }
          }
        })
      }
    }
  }
</script>

<style>
  .page-body-info {
    padding-bottom: 0;
    height: 230px;
  }
  .userinfo-avatar {
    border-radius: 128rpx;
    width: 128rpx;
    height: 128rpx;
  }
  .userinfo-nickname {
    margin-top: 20rpx;
    font-size: 38rpx;
  }
</style>
