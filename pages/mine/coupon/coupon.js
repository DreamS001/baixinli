// pages/mine/coupon/coupon.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    navbar: [
      { navname: "未使用" },
      { navname: "已使用" },
      { navname: "已过期" }
    ],
    currentTab: 0,
    noFollow: true,
    couponList:[]
  },


  // 滚动切换标签样式
  switchTab: function (e) {
    // console.log(e)
    this.setData({
      currentTab: e.detail.current
    });
  },

  // 点击标题切换当前页时改变样式
  navbarTap: function (e) {
    // console.log(e)
    var cur = e.currentTarget.dataset.idx;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  getcouponList:function(){
    var that = this;
    wx.request({
      url: app.apiUrl + 'coupon/queryByUserId',
      method: 'POST',
      data:{
        userId: app.globalData.userInfoAll.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.statusCode==200){
          that.setData({
            couponList: res.data,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    that.getcouponList();
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