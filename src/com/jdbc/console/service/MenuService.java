package com.jdbc.console.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.jdbc.console.dao.MenuDao;
import com.jdbc.console.orm.MenuBean;



@Service
public class MenuService {

	@Resource
	private MenuDao menuDao;

	public List<MenuBean> queryMenuBytreepath(String id) {
		// TODO Auto-generated method stub
		return menuDao.queryMenuBytreepath(id);
	}

	public List<MenuBean> queryMenuById(String id) {
		// TODO Auto-generated method stub
		return menuDao.queryMenuById(id);
	}

	
	
}
