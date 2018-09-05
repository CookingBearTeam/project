<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>jquery的树形菜单代码 </title>
<style>
body { font-family:"宋体"; font-size: 12px; line-height: 1.5em; color:#7FB0C8; padding:0; margin:0; background: #336699;}
ul,ol,li,dl,dt,dd { margin:0; padding:0; list-style-type:none;}
h1,h2,h3,form,input,iframe,span { margin:0; padding:0;} 
a { color:#7FB0C8;}
a:link {color: #7FB0C8; TEXT-DECORATION: none;}
a:visited {color: #7FB0C8; TEXT-DECORATION: none;}
a:hover {color: #fff; TEXT-DECORATION: none;}
.white { color:#fff;}
.white a:link {color: #fff; TEXT-DECORATION: none;}
.white a:visited {color: #fff; TEXT-DECORATION: none;}
.white a:hover {color: #73E1F5; TEXT-DECORATION: none;}
/* 树形菜单开始 */
.close { float:right; clear:right; font-size:12px; font-weight:normal; cursor:pointer; padding-right:10px;}
.title { font-size:14px; color:#fff; margin-bottom:10px; padding-left:5px; width:290px;}
.menu { width:290px; height:700px; overflow-y:auto; overflow-x:hidden; margin-bottom:10px;}
.menu { SCROLLBAR-FACE-COLOR: #002537; SCROLLBAR-HIGHLIGHT-COLOR: #002537; SCROLLBAR-SHADOW-COLOR: #0E6893; SCROLLBAR-3DLIGHT-COLOR: #0E6893; SCROLLBAR-ARROW-COLOR: #fff; SCROLLBAR-TRACK-COLOR: #053d58;SCROLLBAR-DARKSHADOW-COLOR: #002537; SCROLLBAR-BASE-COLOR: #01152a;}
.l1 { background:#000; font-size:13px; padding:5px 0 0 30px; height:20px; margin-bottom:5px; cursor:pointer;}
.slist { margin:0 0 5px 0; display:none;}
.l2 { padding:0 0 0 35px; font-size:13px;}
.l2 a { padding:6px 0 0 5px; width:230px; height:21px; display:block;} 
.currentl2 a,.l2 a:hover { background:#1E5A82; color:#fff;}
.sslist { background:#156890; width:235px; overflow:hidden; margin:0 0 5px 35px; display:none;}
.l3 a { padding:6px 0 0 5px; width:230px; height:20px; display:block;} 
.currentl3 a,.l3 a:hover { color:#fff; font-weight:bold;}
</style>
<script type="text/javascript" src="<%=path%>/js/jquery/jquery-1.8.3.js"></script>
<script type="text/javascript">
// 树状菜单
$(document).ready(function(){
   $(".l1").toggle(function(){
	$(".slist").animate({height: 'toggle', opacity: 'hide'}, "slow");
     $(this).next(".slist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
   },function(){
	    $(".slist").animate({height: 'toggle', opacity: 'hide'}, "slow");
		$(this).next(".slist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
   });
   
   $(".l2").toggle(function(){
     $(this).next(".sslist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
   },function(){
		$(this).next(".sslist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
   });
   
   $(".l2").click(function(){
	$(".l3").removeClass("currentl3");
	$(".l2").removeClass("currentl2");
	$(this).addClass("currentl2");
	});  
   
   $(".l3").click(function(){
	$(".l3").removeClass("currentl3");		  
	$(this).addClass("currentl3");
	});  
   
   $(".close").toggle(function(){
	$(".slist").animate({height: 'toggle', opacity: 'hide'}, "fast");  
	$(".sslist").animate({height: 'toggle', opacity: 'hide'}, "fast");  
	},function(){
	$(".slist").animate({height: 'toggle', opacity: 'show'}, "fast");  
	$(".sslist").animate({height: 'toggle', opacity: 'show'}, "fast");  
	});  
});
</script>
</head>
<body>
<h1 class="title"><span class="close">全部收起/展开</span>树形菜单</h1>
<div class="menu">
  <h1 class="l1">一级菜单</h1>
  <div class="slist">
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
    <ul class="sslist">
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
    </ul>
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
    <ul class="sslist">
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
      <li class="l3"><a href="javascript:function()">·三级菜单</a></li>
    </ul>
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
  </div>
  <h1 class="l1">一级菜单</h1>
  <div class="slist">
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
  </div>
  <h1 class="l1">一级菜单</h1>
  <div class="slist">
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
    <h2 class="l2"><a href="javascript:function()">二级菜单</a></h2>
  </div>
</div>
</body>
</html>