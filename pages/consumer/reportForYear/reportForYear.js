// pages/consumer/reportForYear/reportForYear.js
// const { api } = require('../../../static/data');

Page({

  /**
   * 页面的初始数据
   */
  // mixins: [require('../../../mixin/common')],
  data: {
    array1: [2022,2023,2024],
    value1: 0,
    show: false,
    data: []
  },
  bindPickerChange1(e) {
    this.setData({
      value1: e.detail.value,
    });
  },
  handlBtnClick: function() {
    this.setData({
      data: []
    })
    let that = this;
    // 判断数据问题并弹窗
    // 根据data值请求数据并填充给data
    
    wx.request({
      url: 'http://127.0.0.1:3000/api/reportforms/find',
      data: {
        year: this.data.array1[this.data.value1]
      },
      success: function(res) {
        console.log(res.data)
        let newData = [];
        let pay = null;
        let income = null;
        let spend = null;

        if(res.data.code === 200 ) {
          newData = res.data.data.map(function(num) {
            pay += num.allPay;
            income += num.allIncome;
            spend += num.spendAll
          })
          newData = {
            allPay: pay,
            allIncome: income,
            spendAll: spend
          }
          that.setData({
            data: newData,
            show: true
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