// pages/business/trainSelect/trainSelect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },
  handlInputChange: function(e) {
    let text = e.currentTarget.dataset.change;
    let value = e.detail.value
    this.setData({
      [text]: value
    })
  },
  handlBtnClick: function() {

    // 非空判断，
    if(this.data.id === '') {
      wx.showToast({
        title: '请输入编号',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let that = this;
    // 请求，
    wx.request({
      url: 'http://127.0.0.1:3000/api/pigreceipts',
      data: {
        id: that.data.id
      },
      success: function(res) {
        // console.log(res)
        // 正确跳转
        if(res.data.code === 200) {
          wx.navigateTo({
            url: `/pages/business/trainMod/trainMod?id=${that.data.id}`,
          })
        } else if(res.data.code === -1) {
          wx.showToast({
            title: '无此车次编号',
            icon: 'error',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '请求错误',
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail: function(err) {
        console.log(err)
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