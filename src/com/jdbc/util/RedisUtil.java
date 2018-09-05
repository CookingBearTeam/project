package com.jdbc.util;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;

public class RedisUtil<T> {
	private final static String redisCode = "utf-8";
	protected RedisTemplate<String, T> redisTemplate;
	
	public RedisTemplate<String, T> getRedisTemplate() {
		return redisTemplate;
	}

	public void setRedisTemplate(RedisTemplate<String, T> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	public void del(final String key){
		redisTemplate.execute(new RedisCallback<Long>() {
           public Long doInRedis(RedisConnection connection) throws DataAccessException {
               connection.del(key.getBytes());
               return 1L;
           }
	    });
	}
	
	public void set(final byte[] key, final byte[] value, final long liveTime) {
		redisTemplate.execute(new RedisCallback<Long>() {
           public Long doInRedis(RedisConnection connection) throws DataAccessException {
               connection.set(key, value);
               if (liveTime > 0) {
                   connection.expire(key, liveTime);
               }
               return 1L;
           }
        });
    }
	
	/**
	 * 字符串添加
	 * @param key
	 * @param value
	 * @param liveTime
	 */
	public void set(String key, String value, long liveTime) {
        try {
			this.set(key.getBytes(redisCode), value.getBytes(redisCode), liveTime);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    }
	
	/**
	 * 根据key值获取字符串value 与set方法对应
	 * @param key
	 * @return
	 */
    public String get(final String key) {
        return redisTemplate.execute(new RedisCallback<String>() {
            public String doInRedis(RedisConnection connection) throws DataAccessException {
                try {
                	byte[] valuebyte = connection.get(key.getBytes());
                	if(valuebyte!=null){
                		return new String(connection.get(key.getBytes()), redisCode);
                	}
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                return null;
            }
        });
    }
    
    /**
     * 将对象T放入名字为key的List中
     * @param key
     * @param t
     * @return
     */
    public Long push(String key, T t) {  
        return redisTemplate.opsForList().leftPush(key, t);  
    }
    

    /**
     * 取出名称为key的List中的begin到end之间的数据
     * @param key
     * @param begin
     * @param end
     * @return
     */
    public List<T> getList(String key, long begin, long end){
    	return redisTemplate.opsForList().range(key, begin, end);
    }
    
    
    /**
     * 将对象T保存到名称为key的hash中
     * @param key 
     * @param okey hash对象的key
     * @param ovalue hash对象的value
     */
    public void pushHash(String key, String okey, T ovalue) {  
        redisTemplate.opsForHash().put(key, okey, ovalue);
    }
    /**
     * 从hash中取出名称为key的value 
     * @param key
     * @return
     */
    public List<T> getHashValue(String key){
    	return (List<T>)redisTemplate.boundHashOps(key).values();
    }

    /**
     * 从hash中取出名称为key的value
     * @param key
     * @return
     */
    public T getHashObject(String key){
        return (T) redisTemplate.boundHashOps("product").get(key);
    }

    /**
     * 
     * @param key
     * @return
     */
    public List<T> getHashKey(String key){
    	return (List<T>)redisTemplate.boundHashOps(key).keys();
    }
    
    /**
     * 从名称为key的hash中删除key为id的对象
     * @param key
     * @param id
     */
    public void delHash(String key,String okey){
    	redisTemplate.boundHashOps(key).delete(okey);
    }
}
