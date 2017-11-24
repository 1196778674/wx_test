Page({
  /**
   * 跳转详情
   */
  showDetail: function(e){
    var id = e.currentTarget.dataset.id,
      name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&name=' + name
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '产品介绍',
      path: '/pages/index/index',
      success: function (res) {
        wx.updateShareMenu({
          withShareTicket: true,
          success(res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onReady() {
    this.getSystem();
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
    var self = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        if (res.data.signature) {
          self.setData({
            showModal: true,
            interval: false
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '授权失败，请重新授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      },
    });
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
      // this.setData({
      //   showSuccess: true
      // });
      this.setData({
        showError: true
      });
    },
    radioChange: function(e){
      this.setData({
          user_gender: e.detail.value
      });
    },
    /**
     * 关闭失败按钮
     */
    closeDialogError: function(){
      this.setData({
        showError: false
      });
    },
    /**
     * 关闭成功按钮
     */
    closeDialogSuccess: function () {
      this.setData({
        showSuccess: false
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
    user_gender: '',
    showModal: false,
    showError: false,
    showSuccess: false
  },
});