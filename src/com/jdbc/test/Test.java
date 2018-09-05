package com.jdbc.test;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String value = "abc,defg,hijk,lmn,poq";
		String [] aStrings = value.split(","); 
		Integer array [] = new Integer[aStrings.length];
		System.out.println(aStrings.length);
		System.out.println(array);

		
	}

}
