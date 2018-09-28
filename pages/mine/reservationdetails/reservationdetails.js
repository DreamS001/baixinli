// pages/mine/reservationdetails/reservationdetails.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorId:'',
    reservationdetailsList:[]
  },

  getmyDataInfo: function () {
    var _this = this
    wx.request({
      url: app.apiUrl + 'orderUser/queryByOrderUserId',
      method: 'POST',
      data:{
        orderUserId : _this.data.doctorId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          _this.setData({
            reservationdetailsList: res.data.data
          })
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      doctorId: options.doctorId
    })
    this.getmyDataInfo()
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