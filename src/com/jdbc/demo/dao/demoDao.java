package com.jdbc.demo.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jdbc.demo.orm.demoBean;

@Repository
public interface demoDao {

	List<demoBean> queryGoodsList();

	List<Map<String, String>> querytype1List();
	
	List<Map<String, String>> querytype2List();
	
	List<Map<String, String>> querytype3List();

	List<demoBean> test1();

}
