package com.jdbc.console.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.jdbc.console.dao.UserDao;
import com.jdbc.console.orm.UserBean;


@Service
public class UserService {

	@Resource
	private UserDao userDao;

	public UserBean queryUsername(String username) {
		// TODO Auto-generated method stub
		return userDao.queryUsername(username);
	}

	
	
}
