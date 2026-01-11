package com.example.server.dto.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTellerRequest {
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String name;

    private Long transactionPointID;
}
