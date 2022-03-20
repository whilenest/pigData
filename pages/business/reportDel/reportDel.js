// pages/business/reportDel/reportDel.js
// const { api } = require('../../../static/data')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    year: NaN,
    month: NaN,
    data: {},
    has: false
  },
  handlInputChange: function(e) {
    let text = e.currentTarget.dataset.change;
    let value = e.detail.value
    this.setData({
      [text]: value,
    })
  },
  handlBtnClickEnd: function() {
    let that = this;
    // 根据id请求数据并填充显示
    if(isNaN(this.data.year) || isNaN(this.data.month)) {
      wx.showToast({
        title: '请输入日期',
        icon: 'error',
        duration: 2000
      })
      return
    }
    console.log(that.data.month)
    wx.request({
      url: 'http://127.0.0.1:3000/api/reportforms',
      data: {
        year: that.data.year,
        month: that.data.month
      },
      success: function(res) {
        // console.log(res.data)
        if(res.data.code === 200) {
          that.setData({
            data: res.data.data,
            show: true
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
  handlBtnClick: function() {
    if(this.data.has === false) {
      wx.showToast({
        title: '请先检索日月',
        icon: 'error',
        duration: 2000
      })
      return;
    }
    let that = this
    // 正确弹窗
    wx.showModal({
      title: '警告',
      content: '删除将无法恢复，确定删除吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://127.0.0.1:3000/api/reportforms',
            method: 'DELETE',
            data: {
              year: that.data.year,
              month: that.data.month
            },
            success: function(res) {
              // 成功弹窗跳转展示页 
              if(res.data.code === 200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: `/pages/business/home/home`
                  })
                },2000)
                
              } else if(res.data.code === -1) {
                wx.showToast({
                  title: '数据错误删除失败',
                  icon: 'error',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '请求失败',
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