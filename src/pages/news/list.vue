<template lang="pug">
.container
  view(class="map_container")
    map(class="map" id="map"  scale="14" :longitude="longitude" :latitude="latitude"  show-location="true"  bindmarkertap="makertap")
  view(class="map_text")
    form(@submit="handleClockIn" report-submit='true')
      button(type="primary"  v-if="!clockIn" formType="submit") 到点打卡
      button(type="primary"  v-if="clockIn" formType="submit") 离点打卡
</template>

<script>
import wx from 'wx'
import api from '@/utils/api'
import { mapState } from 'vuex'
var amapFile = require('@/utils/amap-wx.js')

export default {
  data () {
    return {
      latitude: '',
      longitude: '',
      textData: {}
    }
  },
  created () {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    this.handleReportLocation()
  },
  computed: {
    timeOut: {
      set: function (val) {
        this.$store.state.compileTimeout = val
      },
      get: function () {
        return this.$store.state.compileTimeout
      }
    },
    ...mapState([
      'clockIn'
    ])
  },

  mounted () {
    // this.refresh()
    var that = this
    var myAmapFun = new amapFile.AMapWX({ key: 'bad398e44c7542155303951b2e66db68' })
    myAmapFun.getPoiAround({
      iconPathSelected: '/static/images/marker_checked.png',
      iconPath: '/static/images/marker.png',
      success: function (data) {
        that.markersData = data.markers
        that.markers = that.markersData
        that.latitude = that.markersData[0].latitude
        that.longitude = that.markersData[0].longitude
        that.showMarkerInfo(that.markersData, 0)
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  onPullDownRefresh () {
  },
  methods: {
    showMarkerInfo: function (data, i) {
      this.textData = {
        name: '维度:' + data[i].latitude,
        desc: '精度' + data[i].longitude
      }
    },
    makertap: function (e) {
      var id = e.markerId
      this.showMarkerInfo(this.markersData, id)
    },
    handleClockIn: function (e) {
      console.info('fromId', e.mp.detail.formId)
      if (this.$store.state.clockIn === true) {
        this.$store.state.clockIn = false
        wx.showToast({
          title: '离点打卡成功!',
          icon: 'success',
          success: this.uploadFormId(e.mp.detail.formId)
        })
      } else {
        api.getEpsUserInfo().then(result => {
          if (result.code === 200) {
            this.$store.state.clockIn = true
            wx.showToast({
              title: '到点打卡成功!',
              icon: 'success',
              success: this.uploadFormId(e.mp.detail.formId)
            })
          }
        })
      }
    },
    async uploadFormId (formid) {
      await api.postFormId(formid)
    },
    handleReportLocation: function () {
      let _this = this
      this.timeOut = setTimeout(() => {
        if (this.$store.state.hasBind && this.$store.state.token && this.$store.state.clockIn) {
          var location = {'latitude': this.latitude, 'longitude': this.longitude}
          api.reportLocation(location).then(result => {
            // Nothing to do..
          })
        }
        _this.handleReportLocation()
      }, 5000)
    }
  }
}
</script>

<style lang="less" scoped>
  .map_container{
    position: absolute;
    top: 0;
    bottom: 80px;
    left: 0;
    right: 0;
  }
  .map{
    width: 100%;
    height: 100%;
  }
  .map_text{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 80px;
    background: #fff;
    padding: 0 15px;
  }
  text{
    margin: 5px 0;
    display: block;
    font-size:12px;
  }
  .h1{
    margin: 15px 0;
    font-size:15px;
  }
</style>
