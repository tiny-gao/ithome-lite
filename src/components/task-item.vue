<template lang="pug">
form(@submit="turn" report-submit='true')
  button(style="border: 0; padding: 1px; margin: 1px; outline: none;" plain class='btn' formType="submit" @touchmove="touchEnd" @touchstart="touchStart" @touchend="touchEnd")
    .task-item
      img.task-headimg(v-if="task.status==='CREATE' || task.status==='DISPATCH'" src="/static/assets/task-created.png")
      img.task-headimg(v-if="task.status==='EXECUTE'" src="/static/assets/task-execute.png")
      img.task-headimg(v-if="task.status==='EXECUTE_FINISH' || task.status==='TASK_FINISH'" src="/static/assets/task-end.png")
      .task-title {{task.title}}
      .task-info
        .task-info-item @{{task.creator}}
        .task-info-item(style="margin-left:10px") {{task.createAt}}
</template>

<script>
import wx from 'wx'
import api from '@/utils/api'
export default {
  props: {
    task: {
      type: Object,
      default () {
        return {
          detail: true
        }
      }
    }
  },
  methods: {
    turn: function (e) {
      console.info('turn', this.detail)
      if (this.detail === false) {
        return
      }
      const {id, title, creator, worker} = this.task
      this.uploadFormId(e.mp.detail.formId)
      console.info('title', title)
      this.$router.push({
        path: '/pages/task/detail',
        query: {
          id,
          title,
          creator,
          worker
        }
      })
    },
    async uploadFormId (formid) {
      await api.postFormId(formid)
    },
    touchStart: function (e) {
      clearInterval(this.Loop)
      this.detail = true
      var that = this
      this.Loop = setTimeout(function () {
        that.detail = false
        if (that.task.status === 'CREATE' || that.task.status === 'DISPATCH') {
          wx.showModal({
            title: '接单',
            content: '确认接收此单？',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                that.taskChangeStatus(that.task.id, 'EXECUTE').then(result => {
                  if (result.code === 200) {
                    that.task.status = 'EXECUTE'
                    wx.showToast({
                      title: '接单成功!',
                      icon: 'success'
                    })
                  } else {
                    wx.showToast({
                      title: '接单失败!',
                      icon: 'none'
                    })
                  }
                })
              }
            }
          })
        } else if (that.task.status === 'EXECUTE') {
          wx.showModal({
            title: '完成',
            content: '确认此单处理完成？',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                that.taskChangeStatus(that.task.id, 'EXECUTE_FINISH').then(result => {
                  if (result.code === 200) {
                    that.task.status = 'EXECUTE_FINISH'
                    wx.showToast({
                      title: '恭喜你，处理成功!',
                      icon: 'success'
                    })
                  } else {
                    wx.showToast({
                      title: '状态更新失败!',
                      icon: 'none'
                    })
                  }
                })
              }
            }
          })
        }
      }, 800)
    },
    touchEnd: function () {
      clearInterval(this.Loop)
    },
    taskChangeStatus: function (id, status) {
      return api.taskChangeStatus(id, status)
    }
  }
}
</script>

<style lang="less" scoped>
.task-item {
  padding: 10px 10px 2px 60px;
  border-bottom: 1px solid #eee;
  text-align: left;
  position: relative;
}
.task-switch {
  padding: 10px 10px 5px 10px;
  border-bottom: 1px solid #eee;
  position: relative;
  background-color: rgb(165, 9, 34);
  margin-top: -60px;
  margin-right: -10px;
}
.task-headimg {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 10px;
  top: 15px;
}
.task-title {
  line-height: normal;
  font-size: 16px;
}
.task-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}
.task-info-item {
  font-size: 12px;
  color: #aaa;
  display: flex;
  align-items: center;
}
.task-info-icon {
  width: 15px;
  height: 15px;
  margin-right: 4px;
}
</style>
