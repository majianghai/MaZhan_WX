// pages/clothes/clothes.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,

    //   question_data:[{
    //     question_des:"非公募集基金应当向合格投资者募集，合格投资者累计不得超过多少人?",
    //     answer_data:[
    //       {
    //         answer_des: 1,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 2,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 3,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 4,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 5,
    //         image_path: "../../images/img_no_select.png",
    //       }
    //     ]
    //   },
    //   {
    //     question_des: "哈哈哈这是啥是不是啥看看看看看看看?",
    //     answer_data: [
    //       {
    //         answer_des: 4,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 复古风格,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 的热,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 的惹人,
    //         image_path: "../../images/img_no_select.png",
    //       },
    //       {
    //         answer_des: 二二二,
    //         image_path: "../../images/img_no_select.png",
    //       }
    //     ]
    //   },
    //  ],

    array: [{
      answer_des: 1,
      image_path: "未选中.png",
    },
    {
      answer_des: 2,
      image_path: "未选中.png",
    },
    {
      answer_des: 3,
      image_path: "未选中.png",
    },
    {
      answer_des: 4,
      image_path: "未选中.png",
    },
    {
      answer_des: 5,
      image_path: "未选中.png",
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.screenHeight
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(this.data.winHeight)
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

  /**
   * 获取答案改变选项
   */
  getAnswer: function (res) {
    console.log(res)
    var current_answer_id = res.currentTarget.id;

    for (var i = 0; i < this.data.array.length; i++) {
      this.data.array[i].image_path = "未选中.png";
      if (i == current_answer_id) {
        this.data.array[i].image_path = "选中.png";
      }
    }
    this.setData({
      array: this.data.array,
    })

  },
  /**
   * 上一题
   */
  previousQuestion: function (res) {

  },

  /**
   * 下一题
   */
  nextQuestion: function (res) {

  }
})