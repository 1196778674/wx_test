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
      showModal: true,
      interval: false
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
    closeDialog: function () {
      this.setData({
        showModal: false,
        interval: 5000
      });
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function (e) {
      var user = e.detail.value;
      this.setData({
        forms_data: {
          user_name: user.user_name,
          user_phone: user.user_phone,
          user_gender: this.data.user_gender,
          signature: this.data.user.signature
        }
      });
      var params = this.data.forms_data;
      console.log(params);
      this.closeDialog();
    },
    radioChange: function(e){
      this.setData({
          user_gender: e.detail.value
      });
    },
  data: {
    imgUrls: ['../../images/app.png', '../../images/app.png', '../../images/app.png'],
    icons: {
      user: '../../images/icon_user.png',
      phone: '../../images/icon_phone.png'
    },
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 200,
    screenHeight: 0,
    bodyHeight: 0,
    showModal: false,
    user: {
      avatarUrl: '',
      nickName: '',
      gender: '',
      signature: ''
    },
    forms_data: {
      user_name: '',
      user_phone: '',
      signature: ''
    },
    user_gender: ''
  },
});