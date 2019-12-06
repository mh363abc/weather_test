//weather.js
// 注意：
// 代码拷贝后，需要调整一些值，这个代码是大体过程

var app = getApp();//获取当前小程序实例，方便使用全局方法和属性
Page({
  //1、页面数据部分
  data:{
    //设置页面数据，后面空值将在页面显示时通过请求服务器获取
    cur_id:app.curid,basic:"",now:"",suggestion:"",
    url_now:'http://127.0.0.1/wechat/xiaochengxu/weather_test/php/now.php', // 天气接口。提交到本地，本地curl到服务器获取返回
    url_lifestyle:'http://127.0.0.1/wechat/xiaochengxu/weather_test/php/lifestyle.php', // 生活指数。提交到本地，本地curl到服务器获取返回
    // 两个接口：对应的服务器是 "和风天气"提供的
    api_key : 'cb5acaf12eb94aec8a0595459419cd58' // 和风天气[api-key]
  },
  //2、系统事件部分
  onShow:function(){
    var that = this;
    wx.showToast({title: '加载中',icon: 'loading',duration: 10000})//设置加载模态框
    that.getnow(function(d){//获取到数据的回调函数
      wx.hideToast();
      // console.log('getnow-d');
      // console.log(d); return;
      // d.now.src="http://files.heweather.com/cond_icon/"+d.now.cond.code+".png";
      d.now.src="../../img/d01.gif"; // 这里使用外层img中的图片，固定了，如果有合适的可以替换
      // console.log(d.basic);
      // console.log(d.now);
      // console.log(d.update);
      d.basic.update = d.update;
      that.setData({basic:d.basic,now:d.now})//更新数据，视图将同步更新
    })
    that.getsuggestion(function(d){
      // console.log(d);return;
      // console.log(d.lifestyle);
      // console.log(d);
      // 将数据转为合适显示的格式
      var list = {};
      d.lifestyle.forEach(function(item, idx, arr){
        list[item.type] = item;
      });
      // console.log(list);
      // that.setData({suggestion:d.lifestyle})//更新数据
      that.setData({suggestion:list})//更新数据
    })},
  //3、自定义页面方法：获取当前天气API
  getnow:function(fn){
    // console.log('配置请求11');
    var that = this;
    // console.log(that.data.url_now);
    wx.request({//请求服务器，类似ajax
      url: that.data.url_now, 
      data: {location:app.curid,key:that.data.api_key},//和风天气提供用户key，可自行注册获得
      header: {'Content-Type': 'application/json'},
      success: function(res) {
        //成功后将数据传给回调函数执行
        // console.log('获取天气：weather.js-getnow-success:');
        // console.log(res);
        if(200!=res.statusCode){
          console.log('getnow-请求范围结果未定义');
          console.log(res);
          return;
        }
        fn(res.data.HeWeather6[0]);
      },
      fail : function(res){
        console.log('获取天气信息失败！');
        console.log(res);
      }
    })
  },
  //获取生活指数API
  getsuggestion:function(fn){
    // console.log('配置请求22'); return;
    var that = this;
    wx.request({
      url: that.data.url_lifestyle,
      data: {location:app.curid,key:that.data.api_key},
      header: {'Content-Type': 'application/json'},
      success: function(res) {
        // console.log('获取生活指数：weather.js-getsuggestion-success:');
        // console.log(res);
        if (200 != res.statusCode) {
          console.log('getsuggestion-请求范围结果未定义');
          console.log(res);
          return;
        }
        fn(res.data.HeWeather6[0]);
      },
      fail: function (res) {
        console.log('获取生活指数信息失败！');
        console.log(res);
      }
    })
  },
  //4、页面事件绑定部分
  bindViewTap:function(){wx.switchTab({url: '../city/city'})}//跳转菜单页面 
})



