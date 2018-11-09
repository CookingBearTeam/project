package com.jdbc.console.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jdbc.console.orm.MenuBean;



@Repository
public interface MenuDao {

	public List<MenuBean> queryMenuBytreepath(String id);

	public List<MenuBean> queryMenuById(String id);
	

}
