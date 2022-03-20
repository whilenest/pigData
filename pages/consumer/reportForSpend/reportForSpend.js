// pages/consumer/reportForSpend/reportForSpend.js
// const { api } = require('../../../static/data')

Page({
  // mixins: [require('../../../mixin/common')],
  /**
   * 页面的初始数据
   */
  data: {
    array1: [2022,2023,2024],
    array2: [],
    value1: 0,
    value2: 0,
    show: false,
    data: []
  },
  handlBtnClick: function() {
    // 判断数据问题并弹窗
    // 根据data值请求数据并填充给dataList
    this.setData({
      data: []
    })
    let that = this;
    // 判断数据问题并弹窗
    // 根据data值请求数据并填充给data
    
    wx.request({
      url: 'http://127.0.0.1:3000/api/reportforms/find',
      data: {
        year: this.data.array1[this.data.value1],
        month: this.data.array2[this.data.value2]
      },
      success: function(res) {
        console.log(res.data)

        if(res.data.code === 200 ) {
          that.setData({
            data: res.data.data[0],
            show: true
          })
        } else if(res.data.code === -1) {
          wx.showToast({
            title: '此日期无报表',
            icon: 'error',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '数据错误请联系管理员',
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
  bindPickerChange1(e) {
    this.setData({
      value1: e.detail.value,
    });
  },
  bindPickerChange2(e) {
    this.setData({
      value2: e.detail.value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let array2 = Array.from(Array(13), (v,k) =>k);
    array2.shift();
    this.setData({
      array2: array2
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