package com.jdbc.demo.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {
	
	//String时间转时间戳
	public static long DateStringtoLong(String time){
		SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		Date date = null;
		try {
			date = format.parse(time);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		System.out.println("longTime"+date.getTime()); 
		return date.getTime();
	}
	
	//时间戳转String时间
	public static String DateLongToString(Long time){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date=new Date(time);
		String strTime =  df.format(date);
		//Date receiveDate = new Date(Long.parseLong("1515082774721"));
		System.out.println("strTime="+strTime);
		return strTime;
	}
	
	//获取当前时间
	public static void Date(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+08:00"));
		System.out.println("东八区当前时间："+sdf.format(cal.getTime()));
		//Calendar calStart = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		//获取当前时间，00:00:00
		System.out.println("东八区当前时间："+sdf.format(cal.getTime()));
		int nowYear = cal.get(Calendar.YEAR);//获得当前系统时间年份
		Calendar cal1 = Calendar.getInstance();
		cal1.set(Calendar.HOUR_OF_DAY, 0);
		cal1.set(Calendar.MINUTE, 0);
		cal1.set(Calendar.SECOND, 0);
		System.out.println("未加东八区当前时间："+sdf.format(cal.getTime()));
	}
	
	//获取当前时间的整天
	public static void DateForCalendar(){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		long endDate = calendar.getTime().getTime();
		System.out.println("endDate = "+endDate);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		long startDate = calendar.getTime().getTime();
		System.out.println("startDate = "+startDate);
	}
	
	
	
	public static void main(String[] args) throws ParseException {
		// TODO Auto-generated method stub
//		//String时间转时间戳
		DateStringtoLong("2018-05-17 00:00:00");
//		//时间戳转String时间
		DateLongToString(new Date().getTime());
		Date();
		DateForCalendar();
		
	}

}
