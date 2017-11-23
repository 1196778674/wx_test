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
        var info = user.userInfo;
        self.setData({
          user: {
            avatarUrl: info.avatarUrl,
            nickName: info.nickName,
            gender: info.gender,
            signature: user.signature
          }
        });
      }
    });
    this.showModel();
  },
  showModel: function(){
    this.setData({
      showModal: true
    })
  },
  /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
      this.setData({
        showModal: false
      });
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function () {
      this.hideModal();
    },
  data: {
    imgUrls: ['../../images/app.png', '../../images/app.png', '../../images/app.png'],
    indicatorDots: false,
    autoplay: false,
    interval: 100,
    duration: 200,
    screenHeight: 0,
    bodyHeight: 0,
    showModal: false,
    user: {
      avatarUrl: '',
      nickName: '',
      gender: '',
      signature: ''
    }
  },
});