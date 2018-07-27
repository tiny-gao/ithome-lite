<template lang="pug">
div
  .task-title {{task.title}}
  .task-info
    .task-info-item
      span.task-info-text @{{task.creator}}
    .task-info-item
      span.task-info-text {{task.createAt}}
    .task-info-item(style="position:absolute; right:10px")
      span.task-info-text {{task.worker}}
  .task-content(v-html="task.content")
</template>

<script>
import api from '@/utils/api'
import commentItem from '@/components/comment-item'
// import { formatComment } from '@/utils'
import store from '@/store'
import { formatTasksList } from '@/utils'

export default {
  components: {
    commentItem
  },
  data () {
    return {
      loading: false,
      task: {
        creator: {
          name: '',
          id: ''
        }
      }
    }
  },
  mounted () {
    /* Object.assign(this.$data, this.$options.data()) */
    this.getTask()
  },
  onReachBottom () {
    this.getComments()
  },
  methods: {
    async getTask () {
      const { query } = this.$route
      const result = await api.getTask(query.id)
      if (result.code !== 200) {
        return
      }
      const task = result.data
      if (!task) return
      task.content = task.content.replace('--token--', `${store.state.token}`)
      task.content = task.content.replace('--baseurl--api', `${api.baseUrl}`)
      this.task = formatTasksList(task)
      console.info('task', this.task)
      this.task.content = task.content
    },
    async getComments () {
      /* if (this.loading) return
      this.loading = true
      const { query } = this.$route
      const comments = this.task.reply
      const lastComment = comments[comments.length - 1]
      const newComments = await api.getTaskComments(query.id, lastComment.id)
      if (!newComments) return
      const formatedComments = newComments.map(formatComment)
      this.task.reply = this.task.reply.concat(formatedComments)
      this.loading = false */
    }
  }
}
</script>

<style lang="less">
.task-title {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 22px;
}
.task-num {
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.task-info {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.task-info-item {
  margin-right: 10px;
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
.task-content {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  line-height: 1.6;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  min-height: 100px;
}

.comment-wrap {
  width: 100%;
}
</style>
