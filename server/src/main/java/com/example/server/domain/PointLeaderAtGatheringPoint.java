package com.example.server.domain;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "PointLeaderAtGatheringPoint")
public class PointLeaderAtGatheringPoint extends PointLeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LeaderID")
    private Long pointLeaderId;

 
    @OneToOne
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