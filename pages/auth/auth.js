
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    openId:'',
    userInfoAll:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUserInfo: function (e) {
    var _this = this
    // console.log(e)
    if (e.detail.userInfo) {
      console.log('授权通过')
      const user = e.detail.userInfo;
      wx.setStorageSync('user', user)
      // 登录
      wx.login({
        
        success: res => {
          // console.log(res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId

          if (res.code) {
            // 发起网络请求，获取微信信息
            // console.log(res);
            wx.request({
              method: 'POST',
              url: app.apiUrl+'wx/user/huoquOpenid',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data: {
                code: res.code
              },
              success: function (result) {
                _this.setData({
                  openId: result.data.openid
                })
                wx.getUserInfo({
                  success: res => {
                    wx.request({
                      url: app.apiUrl + 'user/queryByOpenid',
                      data: {
                        userOpenid: _this.data.openId,
                        userHead: res.userInfo.avatarUrl,
                        userName: res.userInfo.nickName,
                        userSex: res.userInfo.gender,
                        userAdd: res.userInfo.country
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      success: function (res) {
                        if (res.statusCode==200){
                          const userInfoAll = res.data.data;
                          wx.setStorageSync('userInfoAll', userInfoAll)
                          app.globalData.userInfoAll = res.data.data
                        }
                      }
                    })
                  }
                })
              }
            })
          }
        }
      })
      wx.reLaunch({
        url: '../home/index',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var circleCount = 0;
    this.animationMiddleHeaderItem = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function (res) {

      }
    });

    setInterval(function () {
      if (circleCount % 2 == 0) {
        this.animationMiddleHeaderItem.scale(1.15).step();
      } else {
        this.animationMiddleHeaderItem.scale(1.0).step();
      }
      this.setData({
        animationMiddleHeaderItem: this.animationMiddleHeaderItem.export()
      });
      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1000);
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