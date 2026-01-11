package com.example.server.dto.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TellerCreateOrder {
    private String senderName;
    private String senderAddress;
    private String senderPhoneNumber;
    private String senderPostalCode;

    private String recipientName;
    private String recipientAddress;
    private String recipientPhoneNumber;
    private String recipientPostalCode;

    private String orderType;
    private double mainFare;
    private double extraFare;
    private double netWeight;
    private double conversionWeight;

    private Long userId;
}
