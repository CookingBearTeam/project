package com.jdbc.console.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jdbc.console.orm.UserBean;
import com.jdbc.console.service.UserService;
import com.jdbc.util.StringUtil;


@Controller
@RequestMapping(value = "/console")
public class UserController {		
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/userLogin",method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> userLogin(@RequestParam("username") String username,
			@RequestParam("password") String password) {
		Map<String,Object> map =new HashMap<String,Object>();
		if(StringUtil.isNotNull(username)&&StringUtil.isNotNull(password)){
			Subject currentUser = SecurityUtils.getSubject();
			 // 验证用户是否验证，即是否登录
			if (!currentUser.isAuthenticated()) {
	        	// 把用户名和密码封装为 UsernamePasswordToken 对象
	            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
	            // 记住此对象
	            token.setRememberMe(true);
	            try {
	            	// 执行登录. 
	                currentUser.login(token);
	                map.put("code", 0);
					map.put("msg", "success");
	            } 
	            // 所有认证时异常的父类. 
	            catch (AuthenticationException ae) {
	            	map.put("code", -1);
					map.put("msg", ae.getMessage());
					System.out.println("ae.getMessage()===="+ae.getMessage());
	            }
	        }else{
	        	map.put("code", -1);
				map.put("msg", "此用户已在别处登录，请确认！");
	        }
		}else{
			map.put("code", -1);
			map.put("msg", "用户名或密码为空！");
		}
		return map;
	}
	
	@RequestMapping(value = "/queryUserList",method = RequestMethod.POST)
	public @ResponseBody List<UserBean> queryUserList() {
		List<UserBean> userList = userService.queryUserList();
		return userList;
		
	}
}
	

