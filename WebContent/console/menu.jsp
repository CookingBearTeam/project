<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>小熊后台管理平台</title>
<meta http-equiv="pragma" content="no-cache">
<%@ include file="/static/pages/config.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/console/menu.css">
<script type="text/javascript" src="<%=path%>/static/js/console/menu.js"></script>
</head>
<body class="easyui-layout">
	<div id="northLayoutDiv" data-options="region:'north',split:false,border:false" class="header" style="height:100px;overflow:hidden;">
		<div style="margin-top:15px;margin-left:30px;float:left;width:300px;font-size:34px;font-family:'黑体';color:#fff">小熊后台管理平台</div>
		<div style="float:left;margin-top: 30px;margin-left:50%;margin-right: 15px;width:120px;font-size:15px;font-family:'黑体';color:#fff">
			欢迎: <shiro:principal></shiro:principal>
		</div>
		<div style="float:left;margin-top: 30px;margin-right:25px;width:60px;font-size:15px;font-family:'黑体'">
			<div id="top_updatePassword" class="top_menu">修改密码</div>
	   	</div>
		<div id="top_optMenu" style="float:left;margin-top:30px;margin-right:20px;width:60px;font-size:15px;font-family:'黑体'">
			<a id="top_logout" class="top_logout" href="<%=path%>/shiro/logout">退出</a>
		</div>
	</div>
	
	<div id="westLayoutDiv" data-options="region:'west',split:false,border:false" class="side" style="border-right:#b1b2b2 solid 1px">
        <div id="rootMenuDiv" class="easyui-accordion" data-options="fit:true,border:false">
            <div id="menuTabDiv" data-options="collapsed:false,collapsible:false">
                <div class="menu_tab">
                    <div id="menuShow" class="menu_tab_selected">全部资源</div>
                </div>
                <div id="tree" ></div>
            </div>
        </div>
    </div>
	
	<div id="centerLayoutDiv" data-options="region:'center',border:false" style="overflow: hidden;" class="main">
        <div id="tabMainframe" class="tabs" data-options="fit:true,border:false"></div>
    </div>
	
	<div id="tabsMenu" class="easyui-menu" style="width: 120px; display: none;">
		<div name="close">关闭</div>
		<div name="Other">关闭其他</div>
		<div name="All">关闭所有</div>
	</div>
	<!-- 弹出窗口 -->
	<div id="open_Dialog" style="overflow:hidden"></div>
</body>

</html>
