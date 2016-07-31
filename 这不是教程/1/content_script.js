/**
 * 浏览器页面下的额外脚本
 * 该脚本可以直接操作浏览的dom
 * 可以通过chrome的消息机制,与插件进行交互
 */
var map=['number','name','onhand','taxrate'];

//监听插件发送过来的消息
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.get){
        //某东下的页面逻辑
        sendResponse({
          "price": $('#jd-price').text(),
          "number":$('#short-share span:eq(1)').text(),
          "name":$('#name h1').text(),
          "detail1":$('#product-detail-1').html(),
          "detail2":$('#product-detail-3').text(),
          "detail3":$('#product-detail-5').text()
        })
    }else{
      //本公司的页面逻辑
      var data=request.data;
      var inputs=$('iframe').contents().find('.form-group input');
      //数据补充
      data.onhand=parseInt(Math.random()*1000);//
      data.taxrate=17
      for(var index in map){
        inputs.eq(index).val(data[map[index]])
      }
    }
});