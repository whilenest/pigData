// pages/consumer/detailPage/detailPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id
    })
    // 接收到ID后请求数据并赋值给data
    wx.request({
      url: `http://127.0.0.1:3000/api/pigreceipts?id=${this.data.id}`,
      success: function(res) {
        console.log(res.data)
        if(res.data.code === 200) {
          that.setData({
            data: res.data.data
          })
        }
      },
      fail: function(err) {
        console.log(err)
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