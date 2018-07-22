import request from './request'

const baseUrlApi = 'http://192.168.199.120:9091/v1/api/'
const baseUrlDyn = 'https://dyn.ithome.com'
const baseUrlQuan = 'http://192.168.199.120:9091/v1/api/'

const api = {
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
