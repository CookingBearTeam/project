package com.jdbc.util;

import java.util.List;
import java.util.Map;

import com.alibaba.druid.support.json.JSONUtils;
import com.alibaba.fastjson.JSONArray;

import java.beans.Introspector;
import java.beans.PropertyDescriptor;

public class JsonUtil {
	
    public static String objectToJson(Object object) {
        StringBuilder json = new StringBuilder();
        if (object == null) {
            json.append("\"\"");
            return json.toString();
        } else if (object instanceof String || object instanceof Integer || object instanceof Double) {
            json.append("\"").append(object.toString()).append("\"");
            return json.toString();
        } else if(object instanceof Map){
        	String str = JSONUtils.toJSONString(object); 
        	return str;
        }else {
            json.append(beanToJson(object));
            return json.toString();
        }
       
    }

    public static String beanToJson(Object bean) {
        StringBuilder json = new StringBuilder();
        json.append("{");
        PropertyDescriptor[] props = null;
        try {
            props = Introspector.getBeanInfo(bean.getClass(), Object.class).getPropertyDescriptors();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (props != null) {
            for (int i = 0; i < props.length; i++) {
                try {
                    String name = objectToJson(props[i].getName());
                    String value = objectToJson(props[i].getReadMethod().invoke(bean));
                    json.append(name);
                    json.append(":");
                    json.append(value);
                    json.append(",");
                } catch (Exception e) {
                }
            }
            json.setCharAt(json.length() - 1, '}');
        } else {
            json.append("}");
        }
        return json.toString();
    }
    
    public static String listToJson(List<?> list) {
        StringBuilder json = new StringBuilder();
        json.append("[");
        if (list != null && list.size() > 0) {
            for (Object obj : list) {
                json.append(objectToJson(obj));
                json.append(",");
            }
            json.setCharAt(json.length() - 1, ']');
        } else {
            json.append("]");
        }
        return json.toString();
    }
    
}
