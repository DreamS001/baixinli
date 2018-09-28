// pages/consultant/consultant.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0, 
    navbar: [
      { navname: "个人简介" },
      { navname: "开放时段",}
    ],
    currentTab: 0,
    noFollow:true,

    calendar: [],
    currentIndex: 0,
    currentTime: 0,
    id:1,
    consultanlInfo:{},
    floow:{},
    userInfoAll:{},
    timeArr: [],
    dateList: [],
    week:[]
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  // 点击标题切换当前页时改变样式
  navbarTap: function (e) {
    var cur = e.currentTarget.dataset.idx;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },

  //加关注
  toFollow:function(){
    var _this = this
    wx.request({
      url: app.apiUrl +'doctor/addcon',
      data: {
        doctorId: this.data.id,
        userId: app.globalData.userInfoAll.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.getInfo()
      }
    })
  },
  //取消关注
  toCancel:function(){
    var _this = this
    wx.request({
      url: app.apiUrl +'doctor/delcon',
      data: {
        doctorId: this.data.id,
        userId: app.globalData.userInfoAll.userId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.getInfo()
      }
    })
  },

  goBtn:function(){
    wx.navigateTo({
      url: './selectdate/selectdate?doctorId=' + this.data.id + '&doctorMoney=' + this.data.consultanlInfo.coun.doctorMoney
    })
  },
  //根据id查询
  getInfo: function () {
    var _this=this
    wx.request({
      url: app.apiUrl +'doctor/queryOne',
      data: {
        doctorId: this.data.id,
        userId: app.globalData.userInfoAll.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          consultanlInfo:res.data
        })
      }
    })
  },

  getDateList: function () {
    var that = this;
    wx.request({
      url: app.apiUrl + 'doctorShowtime/queryDoctorShowTime',
      method: 'POST',
      data: {
        doctorId: that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          week: res.data.doctororder,
          dateList: res.data.doctorday,
          timeArr: res.data.showtime,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDateList()

    this.setData({
      id: options.cId,
      userInfoAll: app.globalData.userInfoAll
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
      

    });
    that.getInfo()
    
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