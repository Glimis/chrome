/**
 * 插件弹出层(popup.html),类似于bs端的一个程序
 * popup.html 首页
 * popup.css 首页加载的样式
 * popup.js 首页加载的脚本
 */

//一个蛋疼的问题,每次关闭弹出框后,
//初始化的数据就不见了-。-
//故引用localStorage,用以数据记忆
try{
	var data=JSON.parse(window.localStorage.getItem('data'));
	setValue(data)
}catch(e){

}

//读按钮取事件
//此时应该在某东的某个商品详情下面
$('#get').click(function(){
	//popup.js,只能操作popup.html中的dom节点
	//此处只能通过chrome的消息机制,获取浏览网页中的数据-->对应content_script.js
	chrome.tabs.query({active:true},function(tab){
			chrome.tabs.sendMessage(tab[0].id, {get: 1}, function(data) {
				//回掉,对插件内单元格赋值,不解释
				window.localStorage.setItem('data',JSON.stringify(data));
				setValue(data);
		});
	})
})

//注入按钮事件...略
//此时应该在本公司出品的商品录入菜单下面
$('#put').click(function(){
	try{
		var data=JSON.parse(window.localStorage.getItem('data'));
		chrome.tabs.query({active:true},function(tab){
				chrome.tabs.sendMessage(tab[0].id, {put: 1,data:data});
		})
	}catch(e){

	}
})


// 抓取数据映射至插件上
function setValue(data){
	for(var key in data){
		$('#'+key).text(data[key])
	}
}


