module.exports = [
  {
    path: '/pages/clock/location',
    name: 'ClockLocation',
    config: {
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
