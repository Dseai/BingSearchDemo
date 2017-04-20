# BingSearchDemo
模仿必应搜索
## 使用jquery完成ajax请求并使用jsonp完成跨域
### 1.ajax的jsonp跨域请求
```jquery
 $.ajax({
    	type:"GET",
    	url:"http://api.bing.com/qsonhs.aspx?type=cb&cb=getdata&q=" +searchText,
    	dataType: "jsonp",
    	async:false,
    	jsonp: "getdata",
    	jsonpCallback: "getdata",
	    success: function (data) {
	          getdata(data);
	       }
        });
```
### 2.$.delegate()方法完成事件代理 对于远程从服务器得到的内容添加点击事件 
#### 一般用于给多个元素绑定事件，元素是通过javascript动态添加的情况下
```
$('#suggest').delegate('li','click', function () {  
            var keyword=$(this).text();  
           location.href='http://cn.bing.com/search?q='+keyword;  
        });  
    }); 
```
