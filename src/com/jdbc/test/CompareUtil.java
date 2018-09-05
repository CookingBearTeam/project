package com.jdbc.test;

import java.text.Collator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.sun.javafx.scene.EnteredExitedHandler;


public class CompareUtil {
	
	private void mapCompare() {
		LinkedHashMap<String,String> allValue = new LinkedHashMap<String,String>();
		allValue.put("1", "固瑞克");
		allValue.put("2", "某知名");
		allValue.put("3", "房门口");
		allValue.put("4", "阿克江");
		allValue.put("5", "开空间");
		List<String> list = new ArrayList<String>();
		for(Entry<String, String> map : allValue.entrySet()){
			list.add(map.getValue());
		}
		Collections.sort(list, new Comparator<String>() {  
            @Override  
            public int compare(String o1, String o2) {  
                Comparator<Object> com = Collator.getInstance(java.util.Locale.CHINA);  
                return com.compare(o1, o2);  
  
            }  
        }); 
		LinkedHashMap<String,String> dd = new LinkedHashMap<String,String>();
		for(int i = 0;i<list.size();i++){
			String str = list.get(i);
			for(Entry<String, String> map : allValue.entrySet()){
				if(str.equals(map.getValue())){
					dd.put(map.getKey(), map.getValue());
				}
			}
		}
	     System.out.println(dd+"");
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stuba
		CompareUtil compare = new CompareUtil();
		compare.mapCompare();
	}

}
