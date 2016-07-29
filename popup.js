try{
	var data=JSON.parse(window.localStorage.getItem('data'));
	setValue(data)
}catch(e){
	
}
$('#get').click(function(){
		chrome.tabs.query({active:true},function(tab){
				chrome.tabs.sendMessage(tab[0].id, {greeting: "hello"}, function(data) {
						window.localStorage.setItem('data',JSON.stringify(data));
						setValue(data);
    		});
		})
})


function setValue(data){
	for(var key in data){
		$('#'+key).text(data[key])
	}
}