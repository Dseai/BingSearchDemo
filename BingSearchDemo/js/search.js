// 使用js实现搜索框
//第一个封装的函数  根据id获取dom元素
var getDOM=function(id){
	return document.getElementById(id);
}
//第二个封装函数 事件处理  可以监听多个事件
var addEvent=function(id,event,fn){
	var el=getDOM(id)||document;
	if(el.addEventListener){
		el.addEventListener(event,fn,false);
	}else if(el.attachEvent){
		el.attachEvent('on'+event,fn);
	}
}
//第三个封装函数  获取元素左边距
 var getElementLeft=function(element){
 	var actualLeft=element.offsetLeft;
 	var current=element.offsetParent;
 	while(current){
 		actualLeft+=current.offsetParent;
 		current=current.offsetParent;
 	}
 	return actualLeft;
 }
 var getElementTop=function(element){
 	var actualTop=element.offsetTop;
 	var current=current.offsetParent;
 	while(current){
 		actualTop+=current.offsetTop;
 		current=current.offsetParent;
 	}
 	return actualTop;
 }
 //
 var ajaxGet=function(url,callback){
 	var _xhr=null;
 	//判断浏览器兼容
 	if(window.XMLHttpRequest){
 		_xhr=new window.XMLHttpRequest;
 	}else if(window.ActiveXObject){
 		_xhr=new ActiveXObject("Maxml2.XMLHTTP");

 	}
 	_xhr.open('get',url);
 	_xhr.send(null);
 }
 //事件代理   封装称函数
 var delegateEvent=function(target,event,fn){
 	addEvent(document.event,function(e){
 		if(e.target.nodeName==target.toUpperCase()){
 			fn.call(e.target);
 		};
 	});
 	
 }
 addEvent('search_input','keyup',function(){
 	var searchText=getDOM('search_input').value;
 	ajaxGet('http://api.bing.com/qsonhs.aspx?q='+searchText,function(d){
 		var d=d.AS.Results[0].Suggests;
 		var html='';
 		for(var i=0;i<d.length;i++){
 			html+='<li>'+d[i].Txt+'</li>';
 		}
 		var _dom=getDOM('search_result');
 		_dom.innerHTML=html;
 		_dom.style.top=getElementTop(getDOM('search_form'))+38+'px';
 		_dom.style.left=getElementLeft(getDOM('search_form'))+'px';
 		_dom.style.position='absolute';
 		_dom.style.display='block';
 	});
 });
 delegateEvent('li','click',function(){
 	var keyword=this.innerHTML;
 	location.href='http://cn.bing.com/search?q='+keyword;
 });
