const URI = 'https://xcx.jiyoubang360.com/'
/**
 * 抓取API数据
 * @param  {String} url    链接
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
function fetchApi(url, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    })
  })
}


/**
 * 首页
 * @return {Promise}       包含抓取任务的Promise
 */
function getHomeLayout() {
  return fetchApi(`${URI}index.php/subject/exam`).then(res => res.data)
}

/**
 * 测试题目
 * @return {Promise}       包含抓取任务的Promise
 */
function getHomeLayout() {
  return fetchApi(`${URI}index.php/subject/exam`).then(res => res.data)
}









//网络请求
function request(url, parameters = "", success, method = "GET", header = {}) {
  var that = this;
  this.showLoading();
  wx.request({
    url: URI + url + (method == "GET" ? "?" : "") + parameters,
    data: {},
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function (res) {
      console.log(res);
      wx.hideToast();
      success(res);
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}

//loading提示
function showLoading(title = "请稍后", duration = 50000) {
  wx.showToast({
    title: title,
    icon: 'loading',
    duration: (duration <= 0) ? 5000 : duration
  });
}

//隐藏提示框
function hideToast() {
  wx.hideToast();
}

//HUD 
//成功提示
function showSuccess(title = "成功啦", duration = 2500) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: (duration <= 0) ? 2500 : duration
  });
}

module.exports = {
  request: request,
  showSuccess: showSuccess,
  showLoading: showLoading,
}

