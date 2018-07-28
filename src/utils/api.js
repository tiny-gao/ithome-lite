import request from './request'

const baseUrlApi = 'https://eps.tinygao.cn/v1/api'
const baseUrlDyn = 'https://eps.tinygao.cn'
const baseUrlQuan = 'https://eps.tinygao.cn/v1/api'

const api = {
  baseUrl: 'https://eps.tinygao.cn/',
  getWxSns: (r) => request.post('/user/wxBind', r, {
    baseURL: baseUrlApi
  }),
  unBind: (r) => request.get('/user/wxUnbind', null, {
    baseURL: baseUrlApi
  }),
  getEpsUserInfo: (r) => request.get('/user/userInfo', null, {
    baseURL: baseUrlApi
  }),
  getEpsToken: (r) => request.get('/user/getToken/' + r, null, {
    baseURL: baseUrlApi
  }),
  reportLocation: (r) => request.post('/eps/report', r, {
    baseURL: baseUrlApi
  }),
  getTasks: (maxId) => request.get(`/task/app/listpage`, {maxId: maxId}, {
    baseURL: baseUrlApi
  }),
  getTask: (id) => request.get(`/task/get`, {id: id}, {
    baseURL: baseUrlApi
  }),
  taskChangeStatus: (id, status) => request.post('/task/changeStatus', {id: id, taskStatus: status}, {
    baseURL: baseUrlApi
  }),
  getNewsList: (r) => request.get('/json/newslist/news', null, {
    baseURL: baseUrlApi
  }),
  getNews: (id) => request.get(`/xml/newscontent/${id}.xml`, null, {
    baseURL: baseUrlApi
  }),
  getRelatedNews: (id) => request.get(`/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
    baseURL: baseUrlApi,
    parseJson: false
  }),
  getNewsComments: (id) => request.get(`/json/commentlist/350/87a8e5b144d81938.json`, null, {
    baseURL: baseUrlDyn
  }),
  getSlides: () => request.get('/xml/slide/slide.xml', null, {
    baseURL: baseUrlApi
  }),
  getTopics: (page) => request.get('/task/listpage', {
    page: page
  }, {
    baseURL: baseUrlQuan
  }),
  getTopic: (id) => request.get(`/api/post/${id}`, null, {
    baseURL: baseUrlQuan
  }),
  getTopicComments: (id, last) => request.get('/api/reply', {
    postid: id,
    replyidlessthan: last
  }, {
    baseURL: baseUrlQuan
  })
}

export default api
