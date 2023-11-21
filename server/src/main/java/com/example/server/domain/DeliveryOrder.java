package com.example.server.domain;

import lombok.*;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "DeliveryOrder" )
public class DeliveryOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "senderTransactionPointId")
    private TransactionPoint senderTransactionPoint;

    @ManyToOne
    @JoinColumn(name = "senderGatheringPointId")
    private GatheringPoint senderGatheringPoint;

    @ManyToOne
    @JoinColumn(name = "recipientTransactionPointId")
    private TransactionPoint recipientTransactionPoint;

    @ManyToOne
    @JoinColumn(name = "goodsId")
    private Goods goods;

    @Column(nullable = false)
    private String status;

    @Column(name = "SenderAddress")
    private String senderAddress;

    @Column(name = "RecipientAddress")
    private String recipientAddress;

    @Column(name="Date")
    private Date date;

    @Column(name = "Vendor")
    private String vendor; // payment method: mastercard, cod, momo, ...

    @Column(name="Price")
    private int price;
}