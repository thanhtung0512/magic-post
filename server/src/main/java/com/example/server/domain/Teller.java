package com.example.server.domain;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Teller")
public class Teller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TellerID")
    private Long tellerId;

    @ManyToOne
    @JoinColumn(name = "transactionPointId")
    private TransactionPoint transactionPoint;

    @OneToOne
    @JoinColumn(name="userId")
    private User user;


    @Column(name = "Name")
    private String name;

    @Column(name = "PhoneNumber")
    private String phoneNumber;
}