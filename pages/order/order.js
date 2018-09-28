// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderAllInfo: {},
    couponList: {},
    couponPrice: '',
    total: '',
    couponId: '',
    doctorInfo: []
  },


  //查询是否有满足条件的优惠券
  selectCoupon: function() {
    var that = this;
    wx.request({
      url: app.apiUrl + 'coupon/optCoupon',
      method: 'POST',
      data: {
        userId: parseInt(app.globalData.userInfoAll.userId),
        termSum: parseInt(that.data.orderAllInfo.doctorMoney), //支付金额
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            couponList: res.data.list,
            total: that.data.orderAllInfo.doctorMoney
          })
        }
      }
    })
  },

  radioChange: function(e) {
    var that = this;
    that.setData({
      couponId: e.detail.value
    })
    wx.request({
      url: app.apiUrl + 'coupon/useCoupon',
      method: 'POST',
      data: {
        id: e.detail.value,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            couponPrice: res.data.data.sum,
            total: that.data.orderAllInfo.doctorMoney - res.data.data.sum
          })
        }
      }
    })
  },


  goOrder: function() {
    var that = this;
    //支付步骤：
    //1.本地生成订单
    var timeSt = Date.parse(new Date()) / 1000;
    var orderId = timeSt + app.globalData.userInfoAll.userId;
    wx.request({
      url: app.apiUrl + 'orderPay/pay',
      method: 'POST',
      data: {
        userId: app.globalData.userInfoAll.userId,
        openid: app.globalData.userInfoAll.userOpenid, //用户openid
        price: that.data.total, //支付金额
        money: that.data.couponPrice, //优惠金额
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.statusCode == 200) {
          wx.requestPayment({
            timeStamp: res.data["timeStamp"],
            nonceStr: res.data['nonceStr'],
            package: res.data['package'],
            signType: res.data['signType'],
            paySign: res.data['paySign'],
            success: function(res) {
              console.log(res);
              if (res.errMsg == 'requestPayment:ok') {
                wx.request({
                  url: app.apiUrl + 'coupon/modStatus',
                  method: 'POST',
                  data: {
                    id: that.data.couponId,
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(res) {
                    if (res.statusCode == 200) {
                      console.log('已使用')
                    }
                  }
                })
                if (that.data.orderAllInfo.doctorId == undefined) {
                  wx.request({
                    url: app.apiUrl + 'BxlorderUser/addByBxlOrderUser',
                    method: 'POST',
                    data: {
                      orderUserOpenid: app.globalData.userInfoAll.userOpenid,
                      // doctorOpenid: that.data.basicsInfo.doctorId,
                      orderUserName: that.data.orderAllInfo.order_user_name,
                      orderUserSex: that.data.orderAllInfo.order_user_sex,
                      orderUserAge: that.data.orderAllInfo.order_user_age,
                      orderUserPhone: that.data.orderAllInfo.order_user_phone,
                      orderUserMoney: that.data.total,
                      orderUserWay: that.data.orderAllInfo.order_user_ask,
                      orderUserTime: that.data.orderAllInfo.order_time,
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: function(res) {
                      if (res.statusCode == 200) {
                        wx.navigateTo({
                          url: '../success/success'
                        })
                      }
                    }
                  })
                } else {
                  wx.request({
                    url: app.apiUrl + 'orderUser/addByOrderUser',
                    method: 'POST',
                    data: {
                      orderUserOpenid: app.globalData.userInfoAll.userOpenid,
                      doctorId: that.data.orderAllInfo.doctorId,
                      orderUserName: that.data.orderAllInfo.order_user_name,
                      orderUserSex: that.data.orderAllInfo.order_user_sex,
                      orderUserAge: that.data.orderAllInfo.order_user_age,
                      orderUserPhone: that.data.orderAllInfo.order_user_phone,
                      orderUserMoney: that.data.total,
                      orderUserAsk: that.data.orderAllInfo.order_user_ask,
                      orderTime: that.data.orderAllInfo.order_time
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: function (res) {
                      if (res.statusCode == 200) {
                        wx.navigateTo({
                          url: '../success/success'
                        })
                      }
                    }
                  })
                }
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 5
                  })
                }, 2000)
              }
            },
            complete: function(res) {

            },
            fail: function(res) {
              console.log(res);
            }
          })
        }
      }
    })

  },


  getDoctorInfo: function() {
    var that = this;
    wx.request({
      url: app.apiUrl + 'doctor/queryOne',
      method: 'POST',
      data: {
        userId: app.globalData.userInfoAll.userId,
        doctorId: that.data.orderAllInfo.doctorId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            doctorInfo: res.data.coun,
          })
          console.log(that.data.doctorInfo)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderAllInfo: options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.selectCoupon();
    if (this.data.orderAllInfo.doctorId == undefined) {
      return false;
    } else {
      this.getDoctorInfo()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})