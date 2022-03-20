// pages/consumer/searchForNumb/searchForNumb.js
Page({

  /**
   * 页面的初始数据
   */
  // mixins: [require('../../../mixin/common')],
  data: {
    inputVal: '',
    inputShowed: false,
    data: {},
    show: false
  },
  handlBtnClick: function() {
    // 判断数据问题并弹窗
    // 根据inputVal获取数据并填充到dataList
    let val = this.data.inputVal.trim();
    let that = this;
    if (!val) {
      // 非空S
      wx.showToast({
        title: '请输入车次编号',
        icon: 'error',
        duration: 2000
      })
      return
    } else {
      // 跟据val请求数据
      wx.request({
        url: 'http://127.0.0.1:3000/api/pigreceipts/',
        data: {
          id: val
        },
        success: function(res) {
          // console.log(res.data)
          if(res.data.code === -1) {
            wx.showToast({
              title: '无此车次编号',
              icon: 'error',
              duration: 2000
            })
            return
          } else if (res.data.code === 200) {
            that.setData({
              data: res.data.data,
              show:true
            })
          }
        },
        fail: function(err) {
          console.log(err)
        }
      })

    }
    
  },
  showInput() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      inputShowed: false,
    });
  },
  clearInput() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  handlListClick:function(e) {
    let id = e.currentTarget.dataset.id;
    if(!id) return;
    wx.navigateTo({
      url: `/pages/consumer/detailPage/detailPage?id=${id}`,
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