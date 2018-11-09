package com.jdbc.demo.test;

import com.jdbc.demo.test.PlatformException;

public final class ID {

	private static final ID instance = new ID();
	private final long TWEPOCH = 1288834974657L; //Thu, 04 Nov 2010 01:42:54 GMT
	private final long WORKER_ID_BITS = 5L; //节点ID长度
	private final long DATA_CENTER_ID_BITS = 5L; //数据中心ID长度
	private final long MAX_WORK_ID = -1L ^ (-1L << WORKER_ID_BITS); //最大支持机器节点数0~31，一共32个
	private final long MAX_DATA_CENTER_ID = -1L ^ (-1L << DATA_CENTER_ID_BITS); //最大支持数据中心节点数0~31，一共32个
	private final long SEQUENCE_BITS = 12L; //序列号12位
	private final long WORKER_ID_SHIFT = SEQUENCE_BITS; //机器节点左移12位
	private final long DATA_CENTER_ID_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS; //数据中心节点左移17位
	private final long TIMESTAMP_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS + DATA_CENTER_ID_BITS; //时间毫秒数左移22位
	private final long SEQUENCE_MASK = -1L ^ (-1L << SEQUENCE_BITS); //4095
	private long workerId;
	private long datacenterId;
	private long sequence = 0L;
	private long lastTimestamp = -1L;

	public ID() {
		this(0L, 0L);
	}

	public ID(long workerId, long datacenterId) {
		if (workerId > MAX_WORK_ID || workerId < 0) {
			throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0", MAX_WORK_ID));
		}
		if (datacenterId > MAX_DATA_CENTER_ID || datacenterId < 0) {
			throw new IllegalArgumentException(String.format("datacenter Id can't be greater than %d or less than 0", MAX_DATA_CENTER_ID));
		}
		this.workerId = workerId;
		this.datacenterId = datacenterId;
	}

	public static ID get() {
		return instance;
	}

	public synchronized Long next() {
		long now = timeGen(); //获取当前毫秒数
		//如果服务器时间有问题(时钟后退) 报错。
		if (now < lastTimestamp) {
			throw new PlatformException(String.format(
					"Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - now));
		}
		//如果上次生成时间和当前时间相同,在同一毫秒内
		if (lastTimestamp == now) {
			//sequence自增，因为sequence只有12bit，所以和sequenceMask相与一下，去掉高位
			sequence = (sequence + 1) & SEQUENCE_MASK;
			//判断是否溢出,也就是每毫秒内超过4095，当为4096时，与sequenceMask相与，sequence就等于0
			if (sequence == 0) {
				now = tilNextMillis(lastTimestamp); //自旋等待到下一毫秒
			}
		} else {
			sequence = 0L; //如果和上次生成时间不同,重置sequence，就是下一毫秒开始，sequence计数重新从0开始累加
		}
		lastTimestamp = now;
		// 最后按照规则拼出ID。
		// 000000000000000000000000000000000000000000  00000            00000       000000000000

		// time                                                               datacenterId   workerId    sequence
		return ((now - TWEPOCH) << TIMESTAMP_SHIFT) | (datacenterId << DATA_CENTER_ID_SHIFT)
				| (workerId << WORKER_ID_SHIFT) | sequence;
	}

	protected long tilNextMillis(long lastTimestamp) {
		long timestamp = timeGen();
		while (timestamp <= lastTimestamp) {
			timestamp = timeGen();
		}
		return timestamp;
	}

	protected long timeGen() {
		return System.currentTimeMillis();
	}

}