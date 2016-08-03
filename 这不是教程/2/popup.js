var bg = chrome.extension.getBackgroundPage();

setInterval(function(){
	bg.getTotal(function(data){	
		chrome.browserAction.setBadgeText({text:data.issueTable.total+''})
	});
},60*1000)
