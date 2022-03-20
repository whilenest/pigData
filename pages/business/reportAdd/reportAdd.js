// pages/business/reportAdd/reportAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spend:[]
  },
  handlDelBtn: function(e) {
    let index = e.currentTarget.dataset.index;
    console.log(this.data)
    this.data.spend.splice(index, 1);
    console.log(index)
    console.log(this.data.spend)
    if(this.data.spend.length === 0) {
      this.setData({
        spend: []
      })
      return
    }
    this.setData({
      spend: this.data.spend
    })
  },
  handlInputChange: function(e) {
    let text = e.currentTarget.dataset.change;
    let value = e.detail.value
    this.setData({
      [text]: value
    })
  },
  handlInputSpend: function(e) {
    let text = e.currentTarget.dataset.change;
    let value = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let spend = this.data.spend;
    spend[index][text] = value;
    this.setData({
      spend: spend
    })
  },
  handlAddBtn: function(e) {
    this.data.spend.push({});
    this.setData({
      spend: this.data.spend
    })
  },
  handlBtnClick: function() {
    let dataKey = [],
        dataList = {};
    dataKey = Object.keys(this.data);
    dataKey.forEach((key) => {
      if(key === "__webviewId__") return;
      if(key === "dataList") return;
      dataList[key] = this.data[key];
    })
    this.setData({
      dataList: dataList
    })
    console.log(this.data.dataList)
    // 条件判断，
    let that = this;

    // 弹窗，
    wx.showModal({
      title: '提示',
      content: '确定添加吗',
      success (res) {
        if (res.confirm) {
          // 成功弹窗跳转展示页 
          wx.request({
            url: 'http://127.0.0.1:3000/api/reportforms/add',
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
                  title: '月份重复',
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
          
          
          console.log('用户点击确定')
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