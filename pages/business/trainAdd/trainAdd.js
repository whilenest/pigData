// pages/business/trainAdd/trainAdd.js
Page({
  // mixins: [require('../../../mixin/common')],
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
    let dataKey = [],
        dataList = {},
        that = this;
    dataKey = Object.keys(this.data);
    dataKey.forEach((key) => {
      if(key === "__webviewId__") return;
      if(key === "stockDay") {
        let day = that.data.stockDay.split('-');
        dataList.stockYear = day[0]
        dataList.stockMonth = day[1]
        dataList.stockDate = day[2]
      }
      if(key === "sellDay") {
        let day = that.data.sellDay.split('-');
        dataList.sellYear = day[0]
        dataList.sellMonth = day[1]
        dataList.sellDate = day[2]
      }
      dataList[key] = this.data[key];
    })
    console.log(dataList)
    this.setData({
      dataList: dataList
    })
    console.log(this.data)

    // 弹窗，
    wx.showModal({
      title: '提示',
      content: '确定添加吗',
      success (res) {
        if (res.confirm) {
          if (!that.data.dataList.id) {
            wx.showToast({
              title: '编号不能为空',
              icon: 'error',
              duration: 2000 
            })
            return
          };
          // 成功弹窗跳转展示页 
          wx.request({
            url: 'http://127.0.0.1:3000/api/pigreceipts/add',
            method: "POST",
            data: that.data.dataList,
            success: function(res) {
              console.log(res)
              if (res.data.code === 200) {
                wx.showToast({
                  title: '添加成功',
                  icon: 'success',
                  duration: 2000 
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: `/pages/business/home/home`,
                  })
                },2000)
              } else if (res.data.code === -1) {
                wx.showToast({
                  title: '编号重复',
                  icon: 'error',
                  duration: 2000 
                })
              } else {
                wx.showToast({
                  title: '添加数据出错',
                  icon: 'error',
                  duration: 2000 
                })
              }
            },
            fail: function(err) {
              console.log(err)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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