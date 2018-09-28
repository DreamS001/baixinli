// pages/counselling/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[]
  },
  goConPrice:function(e){
    var that = this;
    wx.request({
      url: app.apiUrl + '/user/update',
      method: 'POST',
      data:{
        id:e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.statusCode==200){
          wx.navigateTo({
            url: './consultingprice/consultingprice',
          })
        }
      }
    })
  },
  getModularList:function(){
    var that = this;
    wx.request({
      url: app.apiUrl + '/user/select',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          item: res.data.data,
        })
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
    this.getModularList()
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