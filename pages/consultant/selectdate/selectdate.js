// pages/consultant/selectdate/selectdate.js

const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [
      { navname: "周一", data:'10' , states: 0 },
      { navname: "周二", data: '11', states: 0 },
      { navname: "周三", data: '12', states: 0 },
      { navname: "周四", data: '13', states: 1 },
      { navname: "周五", data: '14', states: 1 },
      { navname: "周六", data: '15', states: 0},
      { navname: "周日", data: '16', states: 1 },
    ],
    currentTab: 0,
    time:[],
    parameter:{},
    dateList:[],
    dateQ:[],
    addTime:'',
    timeIndex:-1
  },

  // 滚动切换标签样式
  // switchTab: function (e) {
  //   console.log(e)
  //   this.setData({
  //     currentTab: e.detail.current
  //   });
  // },

  // 点击标题切换当前页时改变样式
  navbarTap: function (e) {
    console.log(e)
    var cur = e.currentTarget.dataset.idx;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur,
        timeIndex:-1
      })
    }
  },

  getDateList:function(){
    var that = this;
    wx.request({
      url: app.apiUrl +'doctorShowtime/queryDoctorShowTime',
      method: 'POST',
      data:{
        doctorId: that.data.parameter.doctorId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          dateList: res.data.doctororder,
          dateQ: res.data.doctorday,
          time: res.data.showtime,
        })
      }
    })
  },

  getDate:function(e){
    this.setData({
      addTime: e.currentTarget.dataset.week + '' + e.currentTarget.dataset.date + '' + e.currentTarget.dataset.time,
      timeIndex: e.currentTarget.dataset.id
    })
  },
 

  sure:function(){
    if (this.data.addTime==''){
      wx.showToast({
        title: '请选择时间！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.navigateTo({
      url: '../../application/application?selecttime=' + this.data.addTime + '&doctorId=' + this.data.parameter.doctorId + '&doctorMoney=' + this.data.parameter.doctorMoney
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      parameter: options
    })
    this.getDateList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})