package com.example.server.domain;

import java.io.Serializable;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointLeaderAtTransactionPointId implements Serializable {

    private Long pointLeaderId;
    private Long transactionPoint; // Assuming this is a simple Long field, adjust as needed

    // Constructors, getters, setters, equals, and hashCode methods...
}
