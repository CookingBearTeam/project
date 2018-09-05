package com.jdbc.demo.orm;

import java.io.Serializable;

public class demoBean implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private String id;

	private String goods;

	private String type;
	
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getGoods() {
		return goods;
	}

	public void setGoods(String goods) {
		this.goods = goods;
	}

	
	
	
}
