## 原理分析
### 为什么要区分popup与content_script
你信不信我可以将插件弹出层整的和页面一毛一样?   
![image](https://github.com/Glimis/chrome/raw/master/img/ymyy1.png) 
估计你也发现了,其实就是用chrome打开插件用的popup.html        
![image](https://github.com/Glimis/chrome/raw/master/img/u=3835892145,1339404554&fm=21&gp=0.jpg)    
好吧,说正经的,我的意思是    
虽然不可能,但还是有必要区分页面dom与插件dom,对吧    
所以    
* popup.js可以且仅用来操纵popup.html下的dom    
* content_script.js可以且仅用来操纵浏览页面下的dom

(就上面来看,content_script就像动态加载至浏览页面一样)    

以上两者操作的方式与正常开发一毛一样    
而双方交互的沟通,则通过消息机制

### content_script与浏览器直接加载的script的区别
我觉得肯定一样    
无非是content_script可以使用chrome自带的api    
正是因为一样,所以才可以影响浏览器dom,对吧    
![image](https://github.com/Glimis/chrome/raw/master/img/wsx.jpg)    
容我给你证明    
![image](https://github.com/Glimis/chrome/raw/master/img/jc1-1.png)   

* 看,sources/content_scripts  

没什么大不了的,是脚本注入到页面的代码,可以像开发页面一样,调bug(其中,插件使用了jq2.0)    
* 在控制台输入$().jquery

显示的是1.6.4,嗯,某东使用的jq版本    
* 输入chrome.runtime  

果然不出我所料,可以直接使用chrome的api
* 输入chrome.runtime.onMessage 

仔细看上一个就已经知道了,不存在,我觉得吧,在运行时调用是不符合人道的-。-   
。。。
好吧,其实我只是用证明法来验证观点罢了-。-    
![image](https://github.com/Glimis/chrome/raw/master/img/wsx2.png)    
基于以上证明,可以得知

* content_script与script都能操作dom

必须的,这是他们存在的意义
* content_script与script并不相互依赖

很显然,content_script引用的2.0并不会与script下引用的1.6.4进行冲突    
由该条进而可以在推论
* content_script与script不能进行沟通

而他们的交互...你写script的时候会考虑嘛-。-    
script的能力并不比content_script多多少,完全可以理解为不同沙箱下的js    
目前假设他们根本不需要也没有交互方式

* 他们都能发送消息给插件(chrome.runtime.sendMessage),但只有content_script可以相应插件的信息(chrome.runtime.onMessage)

虽然没有验证,但看起来就是这样
### popup与content_script消息机制(瞎bb)
调用方式类似于事件,使用sendMessage/onMessage进行信息的传递    

* chrome.runtime.onMessage.addListener(cb)

监听由sendMessage发送过来的消息    
* chrome.tabs.sendMessage(extensionId,message, options, cb)

很显然,参数要比onMessage蛋疼的多    
extensionId:对应插件id,不传可能会传给所有插件(表示理解)    
message:传递的消息(必须理解)    
options:额外的配置参数(完全不理解)    
cb:回调    
但这都不是关键,关键是为毛用的是chrome.tabs-。-    
我是这么猜测的    
监听只有在content_script被激活的时候才开始(节省内存云云),故称为runtime    
发射是因为区分tabs(标签)与popup(弹出层),其中tabs是必须存在的,而popup是依附于tabs存在的,类似于tabs的子元素...所以当父元素监听到事件后,向下广播,也并不稀奇    
我都佩服我自己了-。-    

## demo

## 越学,问题越多
* runtime.sendMessage 怎么用?
* tabs属性有哪些(详解)
* 其他的通讯方式还有那些?