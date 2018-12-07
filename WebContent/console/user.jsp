<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>小熊后台管理平台</title>
<meta http-equiv="pragma" content="no-cache">
<%@ include file="/static/pages/config.jsp"%>
<script type="text/javascript" src="<%=path%>/static/js/console/user.js"></script>
</head>
<body>
	<div class="content_title">
		<div style="float:left">系统设置  → 用户管理</div>
	</div>
	
	<div id="brand_page_panel" class="easyui-panel" style="width:100%;overflow:auto;" data-options="title:'查看用户列表'">
		<form id="user_form"  method="post">
			<div class="col" style="width:100%;">
				<div class="col-xs-1" style="padding:10px 0 10px 0px; width:90px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号：</div>
				<div class="col-xs-2" style="padding:10px 0 10px 0px; width:110px;">
					<input id="username" name="username" class="easyui-textbox" data-options="required:false" style="width:100%"/>
				</div>
			</div>
			<div class="col-xs-1" style="padding:9px 0 10px 20px;">
				<a href="#" class="easyui-linkbutton" id="search_btn" data-options="iconCls:'icon-search'" style="width:78px;height:22px">查询</a>
			</div>
		</form>
	</div> 
	
	<div data-options="region:'center',split:false" >
		<table id="user_list" class="easyui-datagrid"></table>
	</div>

	<!-- <div id="tb" style="padding:5px;height:auto">
		<div style="margin-bottom:5px;">
			<a href="#" id="add" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
			<a href="#" id="del" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
		</div>
	</div>  -->
	
</body>
</html>
