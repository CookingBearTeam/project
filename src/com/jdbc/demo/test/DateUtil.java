package com.jdbc.demo.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {
	
	/**
	 * String时间转时间戳
	 * @param String time
	 * @return long
	 */
	public static long dateStringtoLong(String time){
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
	
	/**
	 * 时间戳转String时间
	 * @param String time
	 * @return long
	 */
	public static String dateLongToString(Long time){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date=new Date(time);
		String strTime =  df.format(date);
		//Date receiveDate = new Date(Long.parseLong("1515082774721"));
		System.out.println("strTime="+strTime);
		return strTime;
	}
	
	/**
	 * 获得昨天的的0点0分0秒时间戳
	 * @return long
	 */
	public static long getYestodayZero() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.DATE,-1);
		String dateString = calendar.get(Calendar.YEAR)+"-"+(calendar.get(Calendar.MONTH)+1)+"-"+calendar.get(Calendar.DATE)+" 00:00:00";
		System.out.println(dateString);
		long date = dateStringtoLong(dateString);
		return date;
	}
	
	/**
	 * 获得昨天的的23点59分59秒时间戳
	 * @return long
	 */
	public static long getYestodayTwelve() {
		long getYestodayTwelve = getYestodayZero() + 1000 * 3600 * 24 - 1;
		System.out.println("getYestodayTwelve="+getYestodayTwelve);
		return getYestodayTwelve;
	}
	
	/**
	 * 获得今天的的0点0分0秒时间戳
	 * @return long
	 */
	public static long getTodayZero() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		String dateString = calendar.get(Calendar.YEAR)+"-"+(calendar.get(Calendar.MONTH)+1)+"-"+calendar.get(Calendar.DATE)+" 00:00:00";
		System.out.println(dateString);
		long date = dateStringtoLong(dateString);
		return date;
	}
	
	/**
	 * 获得今天的的23点59分59秒时间戳
	 * @return long
	 */
	public static long getTodayTwelve() {
		long getTodayZero = getYestodayZero() + 1000 * 3600 * 24 - 1;
		System.out.println("getTodayTwelve="+getTodayZero);
		return getTodayZero;
	}
	
	/**
	 * 获取当前时间的整天
	 * @return long
	 */
	public static void dateForCalendar(){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		long endDate = calendar.getTime().getTime();
		System.out.println("endDate = "+endDate);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		long startDate = calendar.getTime().getTime();
		System.out.println("startDate = "+startDate);
	}
	
	//获取当前时间
	public static void date(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+08:00"));
		System.out.println("东八区当前时间："+sdf.format(cal.getTime()));
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
	

	
	public static void main(String[] args) throws ParseException {
		// TODO Auto-generated method stub
//		dateStringtoLong("2018-05-17 00:00:00");
//		dateLongToString(new Date().getTime());
//		date();
//		dateForCalendar();
//		getYestodayZero();
//		getYestodayTwelve();
		
		
	}

}
