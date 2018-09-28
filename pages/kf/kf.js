// pages/kf/kf.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min: 5,//最少字数
    max: 200, //最多字数
    cId:1,
    textarea:'',
    phone:''
  },

  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  inputs1: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  inputs2: function (e) {
    
    this.setData({
      phone: e.detail.value
    })
  },
  kfBtn:function(){
    var _this = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var mobile = _this.data.phone;
    if (_this.data.textarea==''){
      wx.showToast({
        title: '请输入建议或反馈！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.request({
      url: app.apiUrl + 'doctor/addfbk',
      data: {
        doctorId:_this.data.cId,
        userId: app.globalData.userInfoAll.userId,
        phone: _this.data.phone,
        info: _this.data.textarea
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cId = options.cId
    this.setData({
      cId:cId
    })
    
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