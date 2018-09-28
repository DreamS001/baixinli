// pages/screen/screen.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉菜单
    first: '价格',
    second: '性别',
    thirds: '筛选',
    currentTab: 0,
    // 筛选
    array: [{ name: '成人' }, { name: '儿童' }],
    cyyear: [{ name: '不限', selectId: '' }, { name: '1-5年', selectId: 1 }, { name: '6-10年', selectId: 6 }, { name: '10年以上', selectId: 11 }],
    louceng: [{ name: '不限', selectId: '' }, { name: '婚恋家庭', selectId: '婚恋家庭' }, { name: '情绪管理', selectId: '情绪管理' }, { name: '身心健康', selectId: '身心健康' }, { name: '亲子教育', selectId: '亲子教育' }, { name: '性心理', selectId: '性心理' }, { name: '职场', selectId: '职场' }, { name: '工作家庭平衡', selectId: '工作家庭平衡' }, { name: '人际关系', selectId: '人际关系' }, { name: '个人成长', selectId: '个人成长' }],
    sexArry: [{ name: '男' }, { name: '女' }],
    priceArry: [{ price: '100-200', selectId: 100 }, { price: '200-300', selectId: 200 }, { price: '300-400', selectId: 300 }, { price: '400-500', selectId: 400 }, { price: '500-600', selectId: 500 }],
    one: '成人',
    two: '',
    third: '',
    sex: '男',
    price: 100,
  },


  // 区域
  tabNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  // 价格
  chosePrice: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      price: id
    })
  },
  // 性别
  choseSex: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      sex: id
    })
  },
  // 筛选
  choseTxtColor: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      one: id
    })
  },
  chaoxiang: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      two: id
    })
  },
  louceng: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      third: id
    })
  },
  //清空

  qingchu: function () {
    var that = this;
    that.setData({
      currentTab: 0,
      one: '成人',
      two: '',
      third: '',
      sex: '男',
      price: 100,
    })
  },
  //确认
  queren: function () {
    var that = this;
    wx.request({
      url: app.apiUrl + 'list',
      data: {
        sex: that.data.sex,
        money: that.data.price,
        type: that.data.one,
        year: that.data.two,
        gad: that.data.third
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          consultanlList: res.data.list,
        })
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
  },
  goSearch: function () {
    wx.navigateTo({
      url: '../search/search'
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