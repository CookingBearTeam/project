package com.jdbc.console.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jdbc.console.orm.UserBean;


@Repository
public interface UserDao {

	public UserBean queryUsername(String username);

	public List<UserBean> queryUserList();

	

}
