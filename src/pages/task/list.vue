<template lang="pug">
.container
  .topic-wrap
    taskItem(
      v-for="task of tasks",
      :task="task"
      :key="task.id")
  .nomore 没有更多任务，请下拉刷新
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import taskItem from '@/components/task-item'

export default {
  components: {
    taskItem
  },
  onShow () {
    this.refresh()
  },
  computed: {
    ...mapState([
      'tasks'
    ])
  },
  mounted () {
    console.info('mounted')
    this.refresh()
  },
  onPullDownRefresh () {
    this.refresh()
  },
  onReachBottom () {
    this.loadmore()
  },
  methods: {
    ...mapActions([
      'getTasks'
    ]),
    async refresh () {
      await this.getTasks(true)
      wx.stopPullDownRefresh()
    },
    loadmore () {
      this.getTasks()
    }
  }
}
</script>

<style lang="less">
  .nomore {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #ddd;
  }
</style>
