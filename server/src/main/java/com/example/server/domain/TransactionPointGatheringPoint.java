package com.example.server.domain;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Table(name = "TransactionPointGatheringPoint")
@Data
public class TransactionPointGatheringPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LinkingID")
    private Long linkingID;

    @ManyToOne
    @JoinColumn(name = "transactionPointId")
    private TransactionPoint transactionPoint;

    
    @ManyToOne
    @JoinColumn(name = "gatheringPointId")
    private GatheringPoint gatheringPoint;
}
