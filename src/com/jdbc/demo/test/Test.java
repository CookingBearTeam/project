package com.jdbc.demo.test;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		String value = "abc,defg,hijk,lmn,poq";
//		String [] aStrings = value.split(","); 
//		Integer array [] = new Integer[aStrings.length];
//		System.out.println(aStrings.length);
//		System.out.println(array);
		
//		long ss = 1000L;
//		long sa = ss/6;
//		
//		
//		double d = 1.66517963E8;
//		long l = Math.round(d);
//		System.out.println(l);
//		
//		long ll = 100L;
//		double dd = (double) ll;
//		System.out.println(dd);

//		Vector vector = new Vector();
//		vector.add(0,"swdsad");
//		vector.add("swdsad(1)");
//		System.out.println(vector);
		
		
//		Map<String,String> orgMap = new HashMap<String, String>();
//		orgMap.put("1", "aaa");
//		orgMap.put("2", "bbb");
//		orgMap.put("3", "ccc");
//		orgMap.put("4", "ddd");
//		orgMap.put("5", "eee");
//		System.out.println(orgMap.get("1"));
//		System.out.println(orgMap.get("7"));
		
		String displayName = "配额导入模版.xls";
		try {
			String displayName1 = URLEncoder.encode(displayName, "UTF-8");
			System.out.println(displayName1);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

}
