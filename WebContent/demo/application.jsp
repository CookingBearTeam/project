<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>通过Application对象实现网站计数器</title>
</head>
<body>
<%
	int i=0;
	synchronized(application){
		if(application.getAttribute("times")==null){
			i=1;
		}else{
			i=Integer.parseInt((String)application.getAttribute("times"));
			i++;
		}
		application.setAttribute("times", Integer.toString(i));
	}
%>
	<center>
    	<table width="200" border="1" bordercolor="black" bordercolorlight="black" bordercolordark="white" cellpadding="0" style="margin-top:200">
          <tr bgcolor="lightgrey">
            <td align="center">欢迎访问！</td>
          </tr> 
          <tr>
            <td align="center">您是第<b><%=i%></b>位访问本网站的游客！</td>
          </tr>
        </table>
	</center>
</body>
</html>