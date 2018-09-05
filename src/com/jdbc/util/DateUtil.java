package com.jdbc.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	
	/**
	 * 获取当前系统时间
	 * @param format
	 * @return
	 */
	public static String getSystenTime(String format){
		if(format==null){
			format = "yyyyMMddHHmmss";
		}
		return new SimpleDateFormat(format).format(new Date());
	}
	
	public static String getFormateDate(String format, Date date){
		if(format==null){
			format = "yyyyMMddHHmmss";
		}
		return new SimpleDateFormat(format).format(date);
	}

	public static Date strToDate(String strDate, String fmt) {
		if (!StringUtil.isNotNull(strDate)) {
			return null;
		} else {
			if (!StringUtil.isNotNull(fmt))
				fmt = "yyyy-MM-dd";
			SimpleDateFormat format = new SimpleDateFormat(fmt);

			Date date = null;
			try {
				date = format.parse(strDate);
			} catch (Exception e) {}

			return date;
		}
	}

	public static Integer getHour(Date date){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.HOUR_OF_DAY);
	}
	
	/**
	 * @author weiq
	 * 获得当前时间，并返回，long型；
	 * @return
	 */
	public static long getLongTime(){
		Date date = new Date();
		Long time = date.getTime();
		return time;
	}


}
