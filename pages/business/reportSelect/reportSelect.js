// pages/business/reportSelect/reportSelect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handlInputChange: function(e) {
    let text = e.currentTarget.dataset.change;
    let value = e.detail.value
    this.setData({
      [text]: value
    })
  },
  handlBtnClick: function() {
    let that = this;
    let dataList = {
      year: this.data.year - 0,
      month: this.data.month - 0
    }
    // 非空判断，
    if(isNaN(dataList.year) || isNaN(dataList.month)) {
      wx.showToast({
        title: '请输入年月',
        icon: 'error',
        duration: 2000
      })
      return
    }
    // 请求，
    
    wx.request({
      url: 'http://127.0.0.1:3000/api/reportforms/find',
      data: dataList,
      success: function(res) {
        // console.log(res)
        if(res.data.code === 200) {
          that.setData({
            param: {
              year: res.data.data[0].year,
              month: res.data.data[0].month
            }
            
          })
          wx.navigateTo({
            url: `/pages/business/reportMod/reportMod?year=${that.data.param.year}&month=${that.data.param.month}`
          })

        } else if (res.data.code === -1) {
          wx.showToast({
            title: '没有此月份报表',
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