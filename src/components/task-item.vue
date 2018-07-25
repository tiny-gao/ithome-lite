<template lang="pug">
.topic-item(@click="turn")
  img.topic-headimg(src="/static/assets/avatar_default.png")
  .topic-title {{task.title}}
  .topic-info
    .topic-info-item {{task.creator}}
    .topic-info-item
      img.topic-info-icon(src="/static/assets/quan_hit.png")
    .topic-info-item
      img.topic-info-icon(src="/static/assets/quan_comment.png")
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    turn () {
      const { id, title, creator, worker } = this.task
      this.$router.push({
        path: '/pages/quanzi/detail',
        query: {
          id,
          title,
          creator,
          worker
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.topic-item {
  padding: 10px 10px 10px 60px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.topic-headimg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  top: 15px;
}
.topic-title {
  font-size: 16px;
}
.topic-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}
.topic-info-item {
  margin-left: 10px;
  font-size: 12px;
  color: #aaa;
  display: flex;
  align-items: center;
}
.topic-info-icon {
  width: 15px;
  height: 15px;
  margin-right: 4px;
}
</style>
