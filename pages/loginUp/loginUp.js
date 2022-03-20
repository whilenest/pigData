// pages/loginUp/loginUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: ''
  },
  passWdInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  handlLoginClick: function() {
    // 非空
    if(this.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'error',
        duration: 1500
      })
      return
    }
    // 请求数据验证密码
    let param = {
      password: this.data.password
    };

    wx.request({
      url: 'http://127.0.0.1:3000/api/passwords/login',
      method: 'POST',
      data: param,
      success: function(res) {
        // 输入密码错误错误弹窗
        if(res.data.code === -1) {
          wx.showToast({
            title: '密码错误',
            icon: 'error',
            duration: 1500
          });
          return;
        }

        let user = res.data.user;
        console.log(user)
        if( user === 'admin') {
          wx.switchTab({
            url: '/pages/consumer/home/home'
          });
          return;
        } else if ( user === 'superAdmin') {
          wx.redirectTo({
            url: '/pages/business/home/home'
          });
          return;
        } else {
          wx.showToast({
            title: '请求错误请联系管理员',
            icon: 'error',
            duration: 1500
          });
        }
      },
      fail: function(err) {
        console.log(err)
        wx.showToast({
          title: '请求错误请联系管理员',
          icon: 'error',
          duration: 1500
        });
        return;
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