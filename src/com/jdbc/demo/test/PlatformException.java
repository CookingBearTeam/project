package com.jdbc.demo.test;

public class PlatformException extends RuntimeException {


    public PlatformException() {
        super();
    }   
    
    public PlatformException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlatformException(String message) {
        super(message);
    }

    public PlatformException(Throwable cause) {
        super(cause);
    }
}
