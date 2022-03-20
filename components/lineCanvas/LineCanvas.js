// components/lineCanvas/LineCanvas.js

const wxCharts = require('../../utils/wxcharts');
let lineChart = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasDataList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchHandler: function (e) {
      lineChart.scrollStart(e);
    },
    moveHandler: function (e) {
      lineChart.scroll(e);
    },
    touchEndHandler: function (e) {
      lineChart.scrollEnd(e);
      lineChart.showToolTip(e, {
          format: function (item, category) {
              return category + ' ' + item.name + ':' + item.data 
          }
      });        
    },
    canvasInit: function() {
      let windowWidth = 300;
      try {
        let res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth - 30;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      // 创建图表
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: [...this.data.dataList[0],''],
        animation: true,
        // background: '#f5f5f5',
        series: [{
          name: '当前车次盈亏值', 
          data: this.data.dataList[1]
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          title: '盈亏金额 (元)'
        },
        width: windowWidth,
        height: 230,
        dataLabel: false,
        dataPointShape: true,
        enableScroll: false,
        extra: {
          lineStyle: 'curve'
        }
      },this);
    }
    
  },
  lifetimes: {
    ready: function() {
      this.setData({
        dataList: this.data.canvasDataList
      })
      if(this.data.dataList.length <= 0) return;
      this.canvasInit()
      
    }
  }
});
