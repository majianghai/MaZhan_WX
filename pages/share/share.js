Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "肉多多",
    user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJkOj8VUxLjDHEADYaFVlewvWIXiasNAqibSGXoC1RyR2M5FkfW4Cq4icnTV1PvOXQ6UWqSHU9zSXJMA/0",
    course_name: "清理资产，指定资产配置计划",
    coupon_num:"30",
    person_list: [{
      img_url: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJkOj8VUxLjDHEADYaFVlewvWIXiasNAqibSGXoC1RyR2M5FkfW4Cq4icnTV1PvOXQ6UWqSHU9zSXJMA/0",
      name: "肉多多",
    },
    {
      img_url: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJkOj8VUxLjDHEADYaFVlewvWIXiasNAqibSGXoC1RyR2M5FkfW4Cq4icnTV1PvOXQ6UWqSHU9zSXJMA/0",
      name: "肉多多",
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.getStorage({
      key: 'userinfo',
      complete: function (res) {
        console.log("用户新信息" + res.data)
      }
    })
    this.setData({
      user_name: this.data.user_name,
      user_img: this.data.user_img,
      course_name: this.data.course_name,
      coupon_num: this.data.coupon_num,
    })
    console.log(options)
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

  },

  // 课程详情
  courseDetail:function(){

  },

  // 我的课程
  myCourse:function(){

  },

  // 领取奖学金
  getCoupon:function(){

  }
})