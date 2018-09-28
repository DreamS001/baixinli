// pages/counselling/consultingform/consultingform.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min: 5,//最少字数
    max: 200, //最多字数
    maskShow: false,
    array: ['请选择', '女', '男'],
    index: 0,
    name: '',
    age: '',
    phone: '',
    def: '',
    textarea: '',
    basicsInfo: {},
    sex: '',
    select:0,
    time:'',
    money:''
  },

  //字数限制  
  inputs5: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数  
      textarea: e.detail.value
    });
  },
  getSex: function () {
    this.setData({
      maskShow: true
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  getSex1: function (e) {
    var idx = e.currentTarget.dataset.index
    this.setData({
      index: idx,
      maskShow: false
    })
  },
  inputs1: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputs2: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  inputs3: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  inputs4: function (e) {
    this.setData({
      def: e.detail.value
    })
  },
  inputs6: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },


  goPay: function () {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var mobile = that.data.phone;
    if (that.data.name == '') {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (that.data.index == 0) {
      wx.showToast({
        title: '请选择性别！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (that.data.age == '') {
      wx.showToast({
        title: '请输入年龄！',
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
    if (that.data.phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (that.data.time == '') {
      wx.showToast({
        title: '请选择时间！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (that.data.textarea == '') {
      wx.showToast({
        title: '请输入问题描述！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var select = that.data.select
    if(select==0){
      that.setData({
        money:100
      })
    }
    if (select == 1) {
      that.setData({
        money: 200
      })
    }
    if (select == 2) {
      that.setData({
        money: 300
      })
    }
    if (select == 3) {
      that.setData({
        money: 400
      })
    }
    if (select == 4) {
      that.setData({
        money: 500
      })
    }
    if (select == 5) {
      that.setData({
        money: 600
      })
    }

    wx.navigateTo({
      url: '../../order/order?doctorMoney=' + this.data.money + '&order_user_name=' + this.data.name + '&order_user_sex=' + this.data.index + '&order_user_age=' + this.data.age + '&order_user_phone=' + this.data.phone + '&order_user_ask=' + this.data.textarea + '&order_time=' + this.data.time
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    that.setData({
      select:options.select
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