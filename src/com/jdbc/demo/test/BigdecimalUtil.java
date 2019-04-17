package com.jdbc.demo.test;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;


/**
 * 在做运算时需要重新赋值，否则新的数值不能被赋值
 * @author Administrator
 *
 */
public class BigdecimalUtil {
	
	//bigdecimal加法
	private void add(){
		BigDecimal a =new BigDecimal("1.22");
	    System.out.println("construct with a String value: " + a);
	    BigDecimal b =new BigDecimal("2.22");
	    a.add(b);
	    System.out.println("a plus b is : " + a);
	    a = a.add(b);
	    System.out.println("a plus b is : " + a);
	}
	
	//乘法.除法
	private void divide(){
		BigDecimal a = new BigDecimal(1).divide(new BigDecimal(3),4,BigDecimal.ROUND_HALF_UP);
		System.out.println("a = " + a);
		BigDecimal b = a.multiply(new BigDecimal(100)).setScale(2, BigDecimal.ROUND_HALF_UP);
		System.out.println("b = " + b);
	}
	
	//保留两位小数gwt用
//	private void DecimalFormat(){
//		Double dd = 2.0;
//		DecimalFormat    df   = new DecimalFormat("######0.00");  
//		String ss = df.format(dd);
//		System.out.println(ss);
//	}
	
	
	public static void main(String[] args) throws ParseException {
		// TODO Auto-generated method stub
//		/*BigdecimalUtil bigdecimal = new BigdecimalUtil();
//		bigdecimal.add();
//		bigdecimal.divide();*/
		

		BigDecimal weight = new BigDecimal("200");
		BigDecimal grossWeight = new BigDecimal("300");
		BigDecimal unload = grossWeight.subtract(weight);
		int i = unload.compareTo(new BigDecimal("0"));
		if (i < 0) {
			unload = new BigDecimal("0");
		}
		
		
	}
}
