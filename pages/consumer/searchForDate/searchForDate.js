// pages/consumer/searchForDate/searchForDate.js
// const { api } = require('../../../static/data');
Page({

  /**
   * 页面的初始数据
   */
  // mixins: [require('../../../mixin/common')],
  data: {
    array1: [2022,2023,2024],
    array2: [],
    array3: [],
    value1: 0,
    value2: 0,
    value3: 0,
    dataList: []
  },
  handlBtnClick: function() {
    let that = this;
    // 判断数据问题并弹窗
    // 根据data值请求数据并填充给dataList
    wx.request({
      url: 'http://127.0.0.1:3000/api/pigreceipts/find',
      data: {
        stockYear: this.data.array1[this.data.value1],
        stockMonth: this.data.array2[this.data.value2],
        stockDate: this.data.array3[this.data.value3]
      },
      success: function(res) {
        console.log(res.data)

        if(res.data.code === 200 ) {
          that.setData({
            dataList: res.data.data
          })
        } else if(res.data.code === -1) {
          wx.showToast({
            title: '此日期无车次',
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
  // mixins: [require('../../mixin/common')],
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
  bindPickerChange3(e) {
    this.setData({
      value3: e.detail.value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let array2 = Array.from(Array(13), (v,k) =>k),
        array3 = Array.from(Array(32), (v,k) =>k);
    array2.shift();
    array3.shift();
    this.setData({
      array2: array2,
      array3: array3
    })
  },
  handlListClick:function(e) {
    let id = e.currentTarget.dataset.id;
    if(!id) return;
    wx.navigateTo({
      url: `/pages/consumer/detailPage/detailPage?id=${id}`,
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