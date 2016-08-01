

$('button').each(function(index,btn){
	
	$(btn).click(function(){
		//寻找页签id
		//目前认为,能在popup中进行选择,则其相应的页签一定是被激活的
		chrome.tabs.query({active:true},function(tab){
			//发送消息
				chrome.tabs.sendMessage(tab[0].id, {type: index}, function(data) {
					$('p').text(data.msg)
			});
		})
	})
})



