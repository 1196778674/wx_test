// pages/detail/detail.js
Page({
  /**
   * 获取参数
   */
  onLoad: function(opt){
    this.setData({
      options: opt
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    icons: {
      user: '../../images/icon_user.png',
      phone: '../../images/icon_phone.png'
    },
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

  openConfrim: function () {
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
  showModel: function () {
    var self = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
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
  },
  radioChange: function (e) {
    this.setData({
      user_gender: e.detail.value
    });
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var opt = this.data.options;
    return {
      title: opt.name,
      path: '/pages/detail/detail?id=' + opt.id,
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
})