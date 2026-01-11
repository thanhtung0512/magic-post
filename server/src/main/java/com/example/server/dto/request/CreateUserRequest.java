package com.example.server.dto.request;
import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserRequest {
    private String newName;
    private String newUsername;
    private String newPassword;
    private String newEmail;
    private String phoneNumber;
    private Long pointID;
}
