module.exports = [
  {
    path: '/pages/news/list',
    name: 'NewsList',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/news/detail',
    name: 'NewsDetail',
    config: {
      navigationBarTitleText: '文章详情'
    }
  },
  {
    path: '/pages/news/comment',
    name: 'NewsComment',
    config: {
      navigationBarTitleText: '评论列表'
    }
  },
  {
    path: '/pages/quanzi/list',
    name: 'QuanziList',
    config: {
      navigationBarTitleText: '圈子',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/task/list',
    name: 'TaskList',
    config: {
      navigationBarTitleText: '任务',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/task/detail',
    name: 'TaskDetail',
    config: {
      navigationBarTitleText: '任务详情'
    }
  },
  {
    path: '/pages/quanzi/detail',
    name: 'QuanziDetail',
    config: {
      navigationBarTitleText: '圈子详情'
    }
  },
  {
    path: '/pages/profile/index',
    name: 'My',
    config: {
      navigationBarTitleText: '关于我'
    }
  },
  {
    path: '/pages/profile/bind',
    name: 'Bind',
    config: {
      navigationBarTitleText: '绑定账号'
    }
  }
]
