package com.jdbc.console.factory;

import java.util.LinkedHashMap;

public class FilterChainDefinitionMapBuilder {

	public LinkedHashMap<String, String> buildFilterChainDefinitionMap(){
		LinkedHashMap<String, String> map = new LinkedHashMap<>();
		
		map.put("/index.jsp", "anon");
		map.put("/console/userLogin", "anon");
		map.put("/shiro/logout", "logout");
		map.put("/console/menu.jsp", "user");
		map.put("/console/demo.jsp", "authc,roles[user]");
		
		map.put("/**", "authc");
		
		return map;
	}
	
}
