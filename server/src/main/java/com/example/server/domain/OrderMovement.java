package com.example.server.domain;

import lombok.*;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "OrderMovement")
public class OrderMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MovementID")
    private Long movementID;

    @ManyToOne
    @JoinColumn(name = "orderId", nullable = false)
    private DeliveryOrder deliveryOrder;

    @ManyToOne
    @JoinColumn(name = "transactionPointId")
    private TransactionPoint transactionPoint;

    @ManyToOne
    @JoinColumn(name = "gatheringPointId")
    private GatheringPoint gatheringPoint;

    @ManyToOne
    @JoinColumn(name = "DestGatheringPointID")
    private GatheringPoint destGatheringPoint;

    @Column(name = "MovementType", nullable = false)
    private String movementType;


    @Column(name = "MovementDate")
    private Date movementDate;
}