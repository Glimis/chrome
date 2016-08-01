/**
 * 浏览器页面下的额外脚本
 * 该脚本可以直接操作浏览的dom
 * 可以通过chrome的消息机制,与插件进行交互
 */

//监听插件发送过来的消息
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type==0){
      sendResponse({
        msg:'收到信息,但啥也没干'
      })
    }else if(request.type==1){
      $('body').html('干嘣所有页面')
      sendResponse({
        msg:'看页面'
      })
    }else if(request.type==2){
      $('body').append('<div style="border: 1px solid black;width: 100px;height: 100px;position: fixed;bottom: 0px;right: 0px;line-height: 100px;  text-align: center;;z-index: 9999;background: wheat;">传奇霸业</div>')
      sendResponse({
        msg:'出来吧,霸业传奇'
      })
    }else if(request.type==3){
      $('div').each(function(index,div){        
        $(div).data('w',Math.random()*100)
      })
      setInterval(function(){
        
        $('div').each(function(index,div){  
          var w=$(div).data('w');       
          $('div').css('left',w);
        })
        setTimeout(function(){
          $('div').each(function(index,div){  
            var w=$(div).data('w');       
            $('div').css('left',w*-1);
          })
        },300)
      },500);

      sendResponse({
        msg:'颤抖吧,烦人'
      })
    }
});