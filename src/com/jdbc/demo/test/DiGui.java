package com.jdbc.demo.test;

public class DiGui {
	
	public int test1(int x){
		if(x>0){
			return x*test1(x-1);
		}else{
			return 1;
		}
		
	}
	
	public static int test2(int x){
		if(x==1||x==2){
			return 1;
		}else{
			return test2(x-1)+test2(x-2);
		}
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		DiGui  aa = new DiGui();
		System.out.println(aa.test1(5));
	}

}
