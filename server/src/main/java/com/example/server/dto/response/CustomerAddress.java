package com.example.server.dto.response;
import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerAddress {
    private double latitude;
    private double longitude;
    private String address;
}
