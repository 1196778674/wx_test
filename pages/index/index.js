var base64 = require("../../images/base64");

Page({
  /**
   * 页面的初始数据
   */
  // data: {
  //   list: [1,2,3,4,5,6,7,8]
  // },
  onLoad: function () {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
    this.getSystem();
  },
  getSystem() {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        self.setData({
          screenHeight: res.screenHeight + 'px'
        });
      },
    })
  },
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    screenHeight: 0
  },
});