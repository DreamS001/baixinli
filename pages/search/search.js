// pages/search/search.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sercherStorage: [],
    StorageFlag: false,        //显示搜索记录标志位
    inputValue: "", // 搜索的内容
  },

  //获取输入框的输入信息
  goSearch: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    this.setSearchStorage()
  },

  SearchStorage:function(e){
    var name = e.currentTarget.dataset.name
    this.setData({
      inputValue:name
    })
    this.setSearchStorage()
  },
  
  //清楚缓存历史并关闭历史搜索框
  clearSearchStorage: function () {
    wx.removeStorageSync('searchData')
    this.setData({
      sercherStorage: [],
      StorageFlag: false,
    })
  },
  
  //打开历史记录列表
  openLocationsercher: function (e) {
    this.setData({
      sercherStorage: wx.getStorageSync('searchData') || [],   //调用API从本地缓存中获取数据
      StorageFlag: true,
      listFlag: true,
    })
  },
  //添加搜索记录并搜索
  setSearchStorage: function (e) {
    var that = this;
    //let localStorageValue = [];
    if (this.data.inputValue != '') {
      //将搜索记录更新到缓存
      var searchData = that.data.sercherStorage;
      // console.log(searchData)
      searchData.push({
        name: that.data.inputValue
      })
      wx.setStorageSync('searchData', searchData);
      that.setData({ StorageFlag: false, })
      // console.log(that.data.inputValue)
      var searchString = JSON.stringify(that.data.inputValue);
      // console.log(searchString)
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        search: that.data.inputValue
      });
      wx.navigateBack({//返回
        delta: 1
      })
    } else {
      console.log('空白')
    }
    // this.onLoad();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openLocationsercher();
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