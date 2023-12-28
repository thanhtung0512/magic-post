package com.example.server.dto.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    private String newName;
    private Long leaderID;
    private String currentUsername;
    private String newUsername;
    private String newPassword;
    private String newEmail;
    private String phoneNumber;
    private Long pointID;

}
