/**
 * 抓取数据映射至插件上数据而后丢之另一个页面-。-
 * 
 */
//使用ko框架,此处通过顺序的方式获取录入单元
var map=['number','name','onhand','taxrate'];
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.get){
        sendResponse({
          "price": $('#jd-price').text(),
          "number":$('#short-share span:eq(1)').text(),
          "name":$('#name h1').text(),
          "detail1":$('#product-detail-1').html(),
          "detail2":$('#product-detail-3').text(),
          "detail3":$('#product-detail-5').text()
        })
    }else{
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