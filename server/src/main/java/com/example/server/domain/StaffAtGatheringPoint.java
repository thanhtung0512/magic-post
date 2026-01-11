package com.example.server.domain;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "StaffAtGatheringPoint")
public class StaffAtGatheringPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StaffID")
    private Long staffId;

    @ManyToOne
    @JoinColumn(name = "gatheringPointId")
    private GatheringPoint gatheringPoint;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "Name")
    private String name;

    @Column(name = "PhoneNumber")
    private String phoneNumber;
}