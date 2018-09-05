package com.jdbc.demo.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;


import com.jdbc.demo.dao.demoDao;
import com.jdbc.demo.orm.demoBean;

@Service
	public class demoService {

	@Resource
	private demoDao demoDAO;

	public List<demoBean> queryGoodsList() {
		// TODO Auto-generated method stub
		return demoDAO.queryGoodsList();
	}

	public List<Map<String, String>> querytype1List() {
		// TODO Auto-generated method stub
		return demoDAO.querytype1List();
	}
	
	public List<Map<String, String>> querytype2List() {
		// TODO Auto-generated method stub
		return demoDAO.querytype2List();
	}
	
	public List<Map<String, String>> querytype3List() {
		// TODO Auto-generated method stub
		return demoDAO.querytype3List();
	}

	public List<demoBean> test1() {
		// TODO Auto-generated method stub
		return demoDAO.test1();
	}
	
}
