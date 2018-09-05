package com.jdbc.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jdbc.demo.orm.demoBean;
import com.jdbc.demo.service.demoService;
import com.jdbc.util.JsonUtil;



@Controller
@RequestMapping(value = "demo")
public class demoController {		
	
	@Autowired
	private demoService demoService;
	
	@RequestMapping(value = "/test",method = RequestMethod.POST)
	public @ResponseBody String test(@RequestParam("username") String username) {
		List<demoBean> list = demoService.queryGoodsList();
		System.out.println(list);
		Map<String,String> map =new HashMap<String,String>();
		map.put("msg","hello word!");
		return "hello word!";
	}
	
	@RequestMapping(value = "/test1",method = RequestMethod.POST)
	public @ResponseBody String test1() {
		List<demoBean> list = demoService.test1();
		
		return "hello word!";
	}
	
	/**
	 * 蛙儿子旅游物品
	 * @return
	 */
	@RequestMapping(value = "/frog",method = RequestMethod.POST)
	public @ResponseBody List<Map<String, String>> frog() {
		List<Map<String,String>> type1List = demoService.querytype1List();
		List<Map<String,String>> type2List = demoService.querytype2List();
		List<Map<String,String>> type3List = demoService.querytype3List();
		List<Map<String,String>> _return = new ArrayList<Map<String,String>>();
		System.out.println("吃的              护身符              装备1            装备2");
		for(int i = 0;i<type1List.size();i++){
			for (int j = 0; j < type2List.size(); j++) {
				for (int k = 0; k < type3List.size(); k++) {
					for (int n = k+1; n < type3List.size(); n++) {
						Map<String,String> map = new HashMap<String,String>();
						map.put("吃的", type1List.get(i).get("goods"));
						map.put("护身符", type2List.get(j).get("goods"));
						map.put("装备1", type3List.get(k).get("goods"));
						map.put("装备2", type3List.get(n).get("goods"));
						System.out.println(map.get("吃的")+"          "+map.get("护身符")+"          "+map.get("装备1")+"          "+map.get("装备2"));
						_return.add(map);
					}
				}
			}
		}
		String goods = JsonUtil.listToJson(_return);
		System.out.println(goods);
		return _return;
	}

}
	

