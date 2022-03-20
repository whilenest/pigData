// pages/business/trainMod/trainMod.js
// const { api } = require('../../../static/data')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    data: {}
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
        dataList = this.data.data;
    dataKey = Object.keys(this.data);
    dataKey.shift();
    dataKey.forEach((key) => {
      if(key === '__webviewId__') return;
      if(key === 'data') return;
      dataList[key] = this.data[key];
    })
    this.setData({
      data: dataList
    })
    console.log(this.data)
    // 条件判断，
    let that = this;

    // 弹窗，
    wx.showModal({
      title: '提示',
      content: '确定修改吗',
      success (res) {
        if (res.confirm) {
          // 成功弹窗跳转展示页 

          wx.request({
            url: 'http://127.0.0.1:3000/api/pigreceipts/',
            data: that.data.data,
            method: 'PUT',
            success: function(res) {
              if(res.data.code === 200) {
                // console.log(res.data)
                // 成功弹窗跳转展示页 
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 2000 
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: `/pages/business/home/home`
                  })
                },2000)
              } else if (res.data.code === -1) {
                wx.showToast({
                  title: '修改失败ID出错',
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

          // wx.showToast({
          //   title: '修改成功',
          //   icon: 'success',
          //   duration: 2000 
          // })
          // setTimeout(() => {
          //   wx.navigateTo({
          //     url: `/pages/consumer/detailPage/detailPage?id=(${that.data.id})`,
          //   })
          // },2000)
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
    let that = this;
    // 根据id请求数据
    wx.request({
      url: 'http://127.0.0.1:3000/api/pigreceipts',
      data: {
        id: options.id
      },
      success: function(res) {
        // console.log(res)

        let stockDay = `${res.data.data.stockYear}-${res.data.data.stockMonth}-${res.data.data.stockDate}`;
        let sellDay = `${res.data.data.sellYear}-${res.data.data.sellMonth}-${res.data.data.sellDate}`;
        let data = res.data.data;
        data.stockDay = stockDay;
        data.sellDay = sellDay;
        that.setData({
          data: data,
          id: options.id
        })
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