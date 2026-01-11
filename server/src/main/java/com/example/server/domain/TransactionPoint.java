package com.example.server.domain;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "TransactionPoint")
public class TransactionPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TransactionPointID")
    private Long transactionPointId;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Address", nullable = false)
    private String address;

    // Getters and setters
    @Column(name = "Latitude")
    private double latitude;
    // Getters and setters

    @Column(name = "Longitude")
    private double longitude;
}
