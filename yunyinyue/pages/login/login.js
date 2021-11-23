// pages/login/login.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:'',
      password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(event){
    let type = event.currentTarget.id;
    this.setData({
      [type]:event.detail.value
    })
  },
  async login(){
    let {phone,password} = this.data;
    let phoneReg = /^1[3|4|5|7|8]\d{9}$/;
    if(phone){
      if(phoneReg.test(phone)){
        if(password){
          let result = await request('/login/cellphone',{phone,password,isLogin:true});
          if(result.code == 200){
            wx.showToast({
              title:"登陆成功",
            })
            wx.setStorageSync('userInfo',JSON.stringify(result.profile));
            wx.reLaunch({
              url:'/pages/personal/personal'
            })
          }else if(result.code == 400){
            wx.showToast({
              title:"手机号错误",
              icon:"none"
            })
          }else if(result.code == 502){
            wx.showToast({
              title:"密码错误",
              icon:"none"
            })
          }else{
            wx.showToast({
              title:"登陆失败，请重新登陆",
              icon:"none"
            })
          }
        }else{
          wx.showToast({
            title:"密码不能为空",
            icon:'none',
          })
        }
      }else{
        wx.showToast({
          title:"手机号格式错误",
          icon:'none',
        })
        return;
      }
    }else{
      wx.showToast({
        title:"手机号不能为空",
        icon:'none',
      })
      return;
    }
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