// pages/business/reportMod/reportMod.js
// const { api } = require('../../../static/data')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opMonth: '',
    opYear: ''
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
  handlDelBtn: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.spend.splice(index, 1);
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
  handlAddBtn: function(e) {
    this.data.spend.push({});
    this.setData({
      spend: this.data.spend
    })
  },
  handlBtnClick: function() {
    let dataKey = [],
        dataList = this.data.dataList;
    dataKey = Object.keys(this.data);
    dataKey.forEach((key) => {
      if(key === "__webviewId__") return;
      if(key === "dataList") return;
      if(key === "opYear") return;
      if(key === "opMonth") return;
      dataList[key] = this.data[key];
    })
    this.setData({
      dataList: dataList
    })
    
    let that = this;
    // 弹窗，
    wx.showModal({
      title: '提示',
      content: '确定修改吗',
      success (res) {
        if (res.confirm) {

          wx.request({
            url: 'http://127.0.0.1:3000/api/reportforms',
            method: 'PUT',
            data: dataList,
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
    let dataList = {};
    let that = this;
    console.log(options)
    wx.request({
      url: 'http://127.0.0.1:3000/api/reportforms/find',
      data: {
        year: options.year - 0,
        month: options.month - 0
      },
      success: function(res) {
        if(res.data.code === 200) {
          dataList = res.data.data[0];

          that.setData({
            opYear: options.year,
            opMonth: options.month,
            dataList: dataList,
            spend: dataList.spend
          })
          
        } else if (res.data.code === -1) {
          wx.showToast({
            title: '传递数据错误',
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