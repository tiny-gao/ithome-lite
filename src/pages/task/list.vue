<template lang="pug">
.container
  .topic-wrap
    taskItem(
      v-for="task of tasks",
      :task="task"
      :key="task.id")
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import taskItem from '@/components/task-item'

export default {
  components: {
    taskItem
  },
  computed: {
    ...mapState([
      'tasks'
    ])
  },
  mounted () {
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
</style>
