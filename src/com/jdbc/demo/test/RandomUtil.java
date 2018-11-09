package com.jdbc.demo.test;

import java.util.UUID;


public class RandomUtil {
	
	private void ss(){
		String random = String.valueOf((int)(80+Math.random()*(21)));
		System.out.println("random="+random);
	}
	
	private void getUUID(){
		System.out.println(UUID.randomUUID().toString());
		System.out.println(ID.get().next().toString());
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		RandomUtil randomUtil = new RandomUtil();
		randomUtil.ss();
		randomUtil.getUUID();
		

		
	}
	
}





































