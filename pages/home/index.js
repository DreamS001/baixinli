// pages/home/index.js
const app = getApp()
var call = require("../../utils/httpRequest.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0, 
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      // '../../images/banner-1.png',
      // '../../images/banner-2.png'
    ],
    swiperCurrent: 0,
    // 下拉菜单
    first: '价格',
    second: '性别',
    thirds: '筛选',
    currentTab: 0,
    // 筛选
    array: [{ name: '不限', selectId: '' }, { name: '成人', selectId: '成人' }, { name: '儿童', selectId: '儿童' }],
    cyyear: [{ name: '不限', selectId: '' }, { name: '1-5年', selectId: 1 }, { name: '6-10年', selectId: 6 }, { name: '10年以上', selectId: 11}],
    louceng: [{ name: '不限', selectId: '' }, { name: '婚恋家庭', selectId: '婚恋家庭' }, { name: '情绪管理', selectId: '情绪管理' }, { name: '身心健康', selectId: '身心健康' }, { name: '亲子教育', selectId: '亲子教育' }, { name: '性心理', selectId: '性心理' }, { name: '职场', selectId: '职场' }, { name: '工作家庭平衡', selectId: '工作家庭平衡' }, { name: '人际关系', selectId: '人际关系' }, { name: '个人成长', selectId: '个人成长'}],
    sexArry: [{ name: '不限', selectId: '' }, { name: '男', selectId: '男' }, { name: '女', selectId: '女' }],
    priceArry: [{ price: '不限', selectId: '' },{ price: '100-200', selectId: 100 }, { price: '200-300', selectId: 200 }, { price: '300-400', selectId: 300 }, { price: '400-500', selectId: 400 }, { price: '500-600', selectId: 500 }],
    one: '',
    two: '',
    third: '',
    sex: '',
    price: '',
    search:'',
    displays:'none',
    consultanlList:[],
    gad:[],
    couponList:[],
    show: true
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  // 区域
  tabNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
        displays:'block'
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
    // console.log(e)
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


  goSearch:function(){
    wx.navigateTo({
      url:'../search/search'
    })
  },

  goto:function(){
    wx.reLaunch({
      url: '../counselling/index',
    })
  },
  //清空

  qingchu: function () {
    var that = this;
    that.setData({
      currentTab: 0,
      one: '',
      two: '',
      third: '',
      sex: '',
      price: '',
    })
  },
  //确认
  queren: function (){
    var that = this;
    that.getListInfo();
    that.setData({
      displays:'none'
    })
  },

  //优惠券
  getCoupon:function(){
    var that=this;
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
  clickData:function(e){
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.request({
      url: app.apiUrl + 'coupon/getCoupon',
      method: 'POST',
      data:{
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
        if (res.data.rtnCode==1){
          wx.showToast({
            title: '已拥有该优惠券',
            icon: 'warn',
            duration: 2000
          })
        }
      }
    })
  },

  //获取banner
  getBanner:function(){
    var _this=this;
    wx.request({
      url: app.apiUrl + 'banner/list',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.statusCode==200){
          _this.setData({
            imgUrls:res.data.list
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timeSt = Date.parse(new Date()) / 1000;
    var that = this;
    //判断用户缓存信息
    if (!wx.getStorageSync('user')) {
      console.log('验证是否授权');
      wx.navigateTo({
        url: '../auth/auth'
      })
      return;
    } else {
      console.log('已授权')
    }
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    
    that.getListInfo();
    that.getCoupon();
    that.getBanner();
  },

  getListInfo:function(){
    var that=this;
    var data = {
      sex: that.data.sex,
      money: that.data.price,
      type: that.data.one,
      year: that.data.two,
      gad: that.data.third,
      search: that.data.search
    };
    wx.request({
      url: app.apiUrl + 'doctor/list',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        // console.log(res)
        that.qingchu()
        that.setData({
          consultanlList: res.data.list,
        })
      }
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
    var that=this;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    that.setData({//将携带的参数赋值
      search: currPage.data.search
    });
    that.getListInfo();
    // console.log(that.data.search)
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
  
  },
  onPageScroll: function (e) {
    //console.log(e.scrollTop);//{scrollTop:99}
    if (e.scrollTop >= 200) {
      this.setData({
        show: false
      })
    } else {
      this.setData({
        show: true
      })
    }
  }
})