package com.example.server.domain;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "GatheringPoint")
public class GatheringPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GatheringPointID")
    private Long gatheringPointId;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "Latitude")
    private double latitude;
    // Getters and setters

    @Column(name = "Longitude")
    private double longitude;
}
