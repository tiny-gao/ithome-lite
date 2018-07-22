<template lang="pug">
view(class='container')
  view(class='page-body')
    view(class='page-body-info')
      view(class='page-body-title') 用户信息
      block(v-if="hasUserInfo")
        image(class="userinfo-avatar" v-bind:src="userInfo.avatarUrl")
        text(class="userinfo-nickname") {{userInfo.nickName}}
      block(v-if="!hasUserInfo")
        text(class='page-body-text') 未获取
        text(class='page-body-text') 点击绿色按钮获取用户头像和昵称
    view(class="btn-area")
        button(v-on:click='getUserInfo',type="primary", v-if='!hasUserInfo') 获取用户信息
        navigator(url="bind" hover-class="navigator-hover")
          button(type="primary" v-if='hasUserInfo && !hasBind') 绑定EPS系统账号
        button(v-if='hasBind') 解除绑定EPS系统账号
        button(v-on:click='clear' type="warn" v-if='hasUserInfo') 清空用户信息
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
