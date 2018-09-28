// pages/mine/voucher/voucher.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: []
  },


  //优惠券
  getCoupon: function () {
    var that = this;
    wx.request({
      url: app.apiUrl + 'coupon/queryCoupons',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          couponList: res.data.list,
        })
      }
    })
  },
  //点击立即领取
  clickData: function (e) {
    var that = this;
    wx.request({
      url: app.apiUrl + 'coupon/getCoupon',
      method: 'POST',
      data: {
        userId: app.globalData.userInfoAll.userId,
        couponId: e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.rtnCode == '领取成功') {
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000
          })
        }
        if (res.data.rtnCode == 1) {
          wx.showToast({
            title: '已拥有该优惠券',
            icon: 'warn',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.getCoupon();
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