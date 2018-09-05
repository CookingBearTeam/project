<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript" src="<%=path%>/js/jquery/jquery-2.1.4.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$('#click').click(function(){
		var username=$('#username').val();
		$.ajax({
			url:'demo/test',
			type:'post',
			dateType:"json",
			data:{"username":username},
			success:function(data){
				alert("success");
				$('#divshow').html(data);
			},
			error:function(e){
				alert("fail");
				console.log(e);
			}
		});
	})
	
	$('#frog').click(function(){
		$.ajax({
			url:'demo/frog',
			type:'post',
			dateType:"json",
			success:function(data){
				debugger;
				var ss = data[0];
				$('#divshow').html(ss.装备1);
				console.log(ss);
			},
			error:function(e){
				alert("fail");
				console.log(e);
			}
		});
	})
})
</script>
</head>
<body>
	<div  left:200px; top:200px;">
		用户名：<input type="text" name="username" id="username">
          	 <input type="button" id="click" value="点击">
	</div>
	<div style="margin:20px;">
		<input type="button" id="frog" value="青蛙接口">
	</div>
	<div id="divshow"></div>
</body>
</html>
