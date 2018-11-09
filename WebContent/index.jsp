<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>用户登录</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/static/css/console/index.css">
<script type="text/javascript" src="<%=basePath%>/static/js/jquery/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/jquery/jquery.form.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	$(document).ready(function() {
		//判断首页是否是顶级窗口，如果不是处理!
		if (top.location != self.location) {
			window.top.location.href = self.location.href;
		}
	});
	$("#loginForm").ajaxForm(function(data){
		var username =  document.getElementById("username").value;
	    var password =  document.getElementById("password").value;
	    $(".error_info").css("display", "none");
	    $(".error").css("display", "none");
	    //非空验证
		if(username==""||username==null||username==undefined) {
			$(".error").css("display", "block");
			$(".error").html("* 用户名不能为空!");
		}else if(password==""||password==null||password==undefined){
			$(".error").css("display", "block");
			$(".error").html("* 密码不能为空!");
		}else{
			var code = data.code;
			if(code == -1){
				$(".error_info").css("display", "block");
				$(".error_info").html(data.msg);
			}else{
				window.location.href="<%=path%>/console/menu.jsp";
			}
		}
   	});
	
})
</script>

</head>
<body>
	<div class="background">
		<div class="error_info" style="width:400px; height:50px; margin:10px auto;border-radius:15px;border:none; background-color:#DBD7D7;text-align:center;color:#bb0e0a;line-height:50px;position:relative;display:none">
			<div id="error_invalid" style="background-image:url(<%=path%>/static/image/message_error_close.png); background-repeat:no-repeat; width:16px; height:16px;position:absolute;right:20px;top:18px;"></div>
		</div>
		<form action="<%=path%>/console/userLogin" method="post" id="loginForm" name="loginForm">
			<div class="index-form">
				<div class="index-title">后台管理系统</div>
				<div style="width:100%;margin-top:20px;">
	    			<input class="index_username" placeholder="用户名" id="username" name="username">
	  			</div>
	  			<div style="width:100%;margin-top:20px; position:relative;" >
		   			<input class="index_password" type="password" placeholder="密码" id="password" name="password">
	  			</div>
	  			<div style="width:100%;margin-top:10px;color:red" class="error">
	  			</div>
	  			<div style="width:100%;margin-top:20px; position:relative;">
		   			<input class="index_login" type="submit" value="登录">
	  			</div>
			</div>
		</form>
	</div>
</body>
</html>
