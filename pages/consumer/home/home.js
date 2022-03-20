// pages/consumer/home/home.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastDate: '2020-08-09',
    lookNow: false,
    canvasDataList: [],
    pigList: [],
    list: []
  },
  handlListClick: function(e) {
    let id = e.currentTarget.dataset.id;
    if(!id) return;
    wx.navigateTo({
      url: `/pages/consumer/detailPage/detailPage?id=${id}`,
    })
  },
  DataListInit: function(num = 7) {
    let res = [...this.data.pigList];
    res.reverse();
    if(num == null) {
      res = res
    } else {
      res = res.slice(num)
    }
    // console.log(res)
    let newdateList = [], incomeList = [];
    newdateList = res.map(item => item.id)
    incomeList = res.map(item => item.profitAndLoss)
    this.setData({
      canvasDataList:[newdateList, incomeList]
    })
  },
  handleSelect: function(e) {
    let that = this;
    let select = '';
    e === 'week' ? select = e : select = e.currentTarget.dataset.select;
    let num = 0;
    if(select == 'week') {
      num = -7;
      this.setData({
        lookNow: true,
        list: [...this.data.pigList].reverse().slice(num).reverse()
      })
    } else {
      num = -14;
      this.setData({
        lookNow: false,
        list: [...this.data.pigList].reverse().slice(num).reverse()
      })
    }
    that.DataListInit(num);
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取14天列表数据
    wx.request({
      url: 'http://127.0.0.1:3000/api/pigReceipts/list',
      method: 'GET',
      success:  function(res) {
        // 获取canvasDataList数据并填充
        that.setData({
          pigList: res.data.dataList,
          list: res.data.dataList
        })
        that.handleSelect('week')
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