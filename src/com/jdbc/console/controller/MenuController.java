package com.jdbc.console.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jdbc.console.orm.MenuBean;
import com.jdbc.console.service.MenuService;


@Controller
@RequestMapping(value = "/menu")
public class MenuController {		
	
	@Autowired
	private MenuService menuService;
	
	@RequestMapping(value = "/login",method = RequestMethod.POST) 
	public @ResponseBody String userLogin() {
		String tree = getTree("0");
		System.out.println(tree);
		return tree;
	}
	
	//查询节点信息的递归方法
	public String getTree (String id){	
		try{					
			//查找根目录的字节点
			List<MenuBean> list = menuService.queryMenuBytreepath(id);
			List<Map<String,Object>> put = new ArrayList<>();
			if(list.size()>0){
				for(int i = 0;i<list.size();i++){
					Map<String, Object>map =new HashMap<>();
					map.put("id", list.get(i).getId());
		    		map.put("text", list.get(i).getTitle());
		    		List<MenuBean> listChildren = menuService.queryMenuBytreepath(list.get(i).getId());
		    		if(listChildren.size()>0){
		    			map.put("state", "closed");
		    			map.put("children", JSON.parseArray(getTree(list.get(i).getId())));			    			
		    		}else{
		    			map.put("state", "open");
		    		}
		    		put.add(map);
				}		
			}			
			return JSON.toJSONString(put);
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;			
	}
	
}
	

