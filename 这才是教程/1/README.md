## 为什么要区分popup与content_script
你信不信我可以将插件弹出层整的和页面一毛一样?   
![image](https://github.com/Glimis/chrome/raw/master/img/ymyy1.png) 
估计你也发现了,其实就是用chrome打开插件用的popup.html        
![image](https://github.com/Glimis/chrome/raw/master/img/u=3835892145,1339404554&fm=21&gp=0.jpg)    
好吧,说正经的,我的意思是    
虽然不可能,但还是有必要区分页面dom与插件dom,对吧    
所以    
popup.js可以且仅用来操纵popup.html下的dom    
content_script.js可以且仅用来操纵浏览页面下的dom    
以上两者操作的方式与正常开发一毛一样    
而双方交互的沟通,则通过消息机制

## content_script与浏览器直接加载的script的区别
我觉得肯定一样    
无非是content_script可以使用chrome自带的api    
正是因为一样,所以才可以影响浏览器dom,对吧    
![image](https://github.com/Glimis/chrome/raw/master/img/wsx.jpg)    
容我给你证明    
![image](https://github.com/Glimis/chrome/raw/master/img/jc1-1.png)   

* 看,sources/content_scripts   
没什么大不了的,是脚本注入到页面的代码,可以像开发页面一样,调bug(插件使用了jq2.0)    
* 在控制台输入$().jquery
显示的是1.6.4,嗯,某东使用的jq版本    
* 输入chrome.runtime  
果然不出我所料,可以直接使用chrome的api
* 输入chrome.runtime.onMessage 
仔细看上一个就已经知道了,不存在,我觉得吧,在运行时调用是不符合人道的-。-   
。。。
好吧,我编不下去了,其实我只是用证明法来验证观点罢了-。-    
![image](https://github.com/Glimis/chrome/raw/master/img/wsx2.png)    
总之,可以发现
content_scripts与浏览器下的js(sources)的区别包括
* 


## chrome插件消息机制分析(瞎bb)

![image](https://github.com/Glimis/chrome/raw/master/img/jc1-1.png) 



## chrome.runtime.onMessage
