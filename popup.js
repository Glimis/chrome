try{
	var data=JSON.parse(window.localStorage.getItem('data'));
	setValue(data)
}catch(e){

}
$('#get').click(function(){
		chrome.tabs.query({active:true},function(tab){
				chrome.tabs.sendMessage(tab[0].id, {get: 1}, function(data) {
						window.localStorage.setItem('data',JSON.stringify(data));
						setValue(data);
    		});
		})
})


$('#put').click(function(){
	try{
		var data=JSON.parse(window.localStorage.getItem('data'));
		chrome.tabs.query({active:true},function(tab){
				chrome.tabs.sendMessage(tab[0].id, {put: 1,data:data});
		})
	}catch(e){

	}
})


/**
 * 抓取数据映射至插件上
 */
function setValue(data){
	for(var key in data){
		$('#'+key).text(data[key])
	}
}


