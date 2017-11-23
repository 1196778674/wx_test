Page({
  /**
   * 页面的初始数据
   */
  // data: {
  //   list: [1,2,3,4,5,6,7,8]
  // },
  onLoad: function () {
    
  },
  onReady() {
    this.getSystem();
  },
  onShow() {

  },
  onHide(){

  },
  getSystem() {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          screenHeight: res.screenHeight + 'px',
          bodyHeight: (res.screenHeight/2 - 80) + 'px',
        });
      },
    })
  },
  openConfrim: function(){
    var self = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        var user = res.data;
        self.setData({
          user: {
            avatarUrl: user.avatarUrl,
            nickName: user.nickName,
            gender: user.gender
          }
        });
      }
    })
    this.setData({
      hidden: false
    });
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  },
  data: {
    imgUrls: ['../../images/app.png', '../../images/app.png', '../../images/app.png'],
    indicatorDots: false,
    autoplay: false,
    interval: 100,
    duration: 500,
    screenHeight: 0,
    bodyHeight: 0,
    hidden: true,
    nocancel: false,
    user: {
      avatarUrl: '',
      nickName: '',
      gender: ''
    }
  },
});