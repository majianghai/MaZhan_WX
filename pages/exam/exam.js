
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,

    question_data: [
      {
        question_des: "非公募集基金应当向合格投资者募集，合格投资者累计不得超过多少人?",
        answer_data: [{
          answer_des: 1,
          image_path: "image_no_select.png",
        },
        {
          answer_des: 2,
          image_path: "image_no_select.png",
        },
        {
          answer_des: 3,
          image_path: "image_no_select.png",
        }]
      },
      {
        question_des: "份和份好多好多话好多好多好多好多好多话",
        answer_data: [{
          answer_des: 1,
          image_path: "image_no_select.png",
        },
        {
          answer_des: 2,
          image_path: "image_no_select.png",
        },
        {
          answer_des: 3,
          image_path: "image_no_select.png",
        }]
      },
      {
        question_des: "份和滴滴答答滴滴答答好多话",
        answer_data: [{
          answer_des: "大家地方哈哈",
          image_path: "image_no_select.png",
        },
        {
          answer_des: "dddd",
          image_path: "image_no_select.png",
        },
        {
          answer_des: "绝对绝对绝对绝对家",
          image_path: "image_no_select.png",
        }]
      }
    ],

    question_des: "非公募集基金应当向合格投资者募集，合格投资者累计不得超过多少人?",
    current_question: 1,
    count_question: 1,
    answer_percent: 0,
    array: [],

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
    var count = this.data.question_data[this.data.current_question - 1].answer_data.length;
    this.setData({
      question_des: this.data.question_data[this.data.current_question - 1].question_des,
      array: this.data.question_data[this.data.current_question - 1].answer_data,
      count_question: this.data.question_data[this.data.current_question - 1].answer_data.length,
      answer_percent: this.data.current_question / count * 100,
    })
    console.log("answer_percent"+this.data.answer_percent)

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
      this.data.array[i].image_path = "image_no_select.png";
      if (i == current_answer_id) {
        this.data.array[i].image_path = "image_select.png";
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

    var current = this.data.current_question-1;
    if(current<=0){
      current = 0;
    }
    this.setData({
      current_question: current,
      question_des: this.data.question_data[current - 1].question_des,
      array: this.data.question_data[current - 1].answer_data,
      count_question: this.data.question_data[current - 1].answer_data.length,
      answer_percent: current / this.data.count_question * 100,
    })
  },

  /**
   * 下一题
   */
  nextQuestion: function (res) {
    var current = this.data.current_question + 1;
    if (current > this.data.count_question) {
      current = this.data.count_question;
      this.result();
    } else {
      this.setData({
        current_question: current,
        question_des: this.data.question_data[current - 1].question_des,
        array: this.data.question_data[current - 1].answer_data,
        count_question: this.data.question_data[current - 1].answer_data.length,
        answer_percent: current / this.data.count_question * 100,
      })
    }
  },

  // 跳转结果页
  result: function () {
    wx.navigateTo({
      url: '../result/result'
    })
  }
})