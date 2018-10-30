<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>用户登录</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/index.css">
<script type="text/javascript" src="<%=path%>/static/js/jquery/jquery-2.1.4.js"></script>
<script type="text/javascript" src="<%=path%>/static/js/jquery/jquery.form.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	$(document).ready(function() {
		//判断首页是否是顶级窗口，如果不是处理!
		if (top.location != self.location) {
			window.top.location.href = self.location.href;
		}
	});
	
	
})
</script>

</head>
<body>
	<div>
		Welcome: <shiro:principal></shiro:principal>
	</div>
	<shiro:hasRole name="admin">
	<br><br>
	<a href="login.jsp">Login Page</a>
	</shiro:hasRole>
	
	<shiro:hasRole name="user">
	<br><br>
	<a href="/console/demo.jsp">Demo Page</a>
	</shiro:hasRole>
	
	<br><br>
	<a href="shiro/logout">Logout</a>
</body>
</html>
