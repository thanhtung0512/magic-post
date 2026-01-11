package com.example.server.exceptions;

public class OrderNotFoundException {
    private String error;
    public OrderNotFoundException(String string) {
        this.error = string;
    }

}
