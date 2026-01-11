package com.example.server.utilities;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class StatusOrderConstant {
    public static final String NEED_FORWARD_TO_SENDER_GATHERING_POINT = "Need Forward To Sender Gathering Point";
    public static final String WAITING_SENDER_GATHERING_POINT_ACCEPT = "Waiting Sender Gathering Point Accept";
    public static final String SENDER_GATHERING_ACCEPTED = "Sender Gathering Accepted";
    public static final String SENDER_GATHERING_DECLINED = "Sender Gathering Declined";
    public static final String WAITING_RECIPIENT_GATHERING_POINT_ACCEPT = "Waiting Recipient Gathering Point Accept";
    public static final String RECIPIENT_GATHERING_ACCEPTED = "Recipient Gathering Accepted";
    public static final String FORWARD_TO_DESTINATION_TRANSACTION = "Forward to Destination Transaction";
    public static final String ORDER_AT_DESTINATION_TRANSACTION = "Order At Destination Transaction";
    public static final String SHIPPING = "Shipping";
    public static final String FAIL = "Failed, return to transaction point";
    public static final String DELIVERY_SUCCESS = "Delivered Successfully";
}
