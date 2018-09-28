// pages/counselling/consultingprice/consultingprice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceArry: [ { name: '100元', select: '100元' }, { name: '200元', select: '200元' }, { name: '300元', select: '300元' }, { name: '400元', select: '400元' }, { name: '500元', select: '500元' }, { name: '600元', select: '600元' }],
    select:0
  },


  bindChange: function (e) {
    console.log(e)
    let val = e.detail.value
    console.log(val[0])
    this.setData({
      select:val[0]
    })
  },
  goNext:function(e){
    wx.navigateTo({
      url: '../consultingform/consultingform?select=' + this.data.select
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