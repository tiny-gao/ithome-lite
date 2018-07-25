import Vue from 'vue'
import Vuex from 'vuex'
import xml2json from 'xmlstring2json'
import { formatSlideList, formatNewsList, formatTopicList, formatTasksList } from '@/utils'
import api from '@/utils/api'
import wx from 'wx'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    slides: [],
    news: [],
    topics: [],
    tasks: [],
    hasLogin: false,
    token: '',
    hasUserInfo: false,
    hasBind: false,
    userInfo: {},
    mobileNum: '',
    name: '',
    compileTimeout: '',
    clockIn: false
  },
  mutations: {
    slides (state, data) {
      state.slides = data
    },
    news (state, data) {
      state.news = data
    },
    topics (state, data) {
      state.topics = data
    },
    tasks (state, data) {
      state.tasks = data
    }
  },
  actions: {
    async getSlides ({ commit }) {
      const slides = await api.getSlides()
      if (!slides) return
      const parsedSlides = xml2json(slides).rss.channel.item
      const filtedSlides = parsedSlides.filter(
        slide => slide.opentype['#text'] === '1'
      )
      const formatedSlides = filtedSlides.map(formatSlideList)
      commit('slides', formatedSlides)
    },
    async getNewsList ({ state, commit }, init) {
      const news = await api.getNewsList()
      if (!news) return
      const formatedNews = news.newslist.map(formatNewsList)
      if (init) {
        commit('news', formatedNews)
      } else {
        commit('news', state.news.concat(formatedNews))
      }
    },
    async getTasks ({ state, commit }, init) {
      let lastId = 0
      if (!init) {
        const lastTask = state.tasks[state.tasks.length - 1]
        lastId = lastTask.id
      }
      const tasks = await api.getTasks(lastId).then(result => {
        if (result.code !== 200) {
          wx.showToast({
            title: result.msg,
            icon: 'none'
          })
          return null
        } else {
          if (result.data.length === 0) {
            wx.showToast({
              title: '没有新任务',
              icon: 'none'
            })
          }
          return result.data
        }
      })
      console.info(tasks)
      if (!tasks) return
      const formatedTasks = tasks.map(formatTasksList)
      if (init) {
        commit('tasks', formatedTasks)
      } else {
        commit('tasks', state.tasks.concat(formatedTasks))
      }
      console.info(state.tasks)
    },
    async getTopics ({ state, commit }, init) {
      let replytime = Date.now()
      if (!init) {
        const lastTopic = state.tasks[state.tasks.length - 1]
        replytime = lastTopic.replytime.replace(/[^0-9]/ig, '')
      }
      const topics = await api.getTopics(replytime)
      if (!topics) return
      const formatedTopics = topics.map(formatTopicList)
      if (init) {
        commit('topics', formatedTopics)
      } else {
        commit('topics', state.topics.concat(formatedTopics))
      }
    }
  }
})

export default store
