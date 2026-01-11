package com.example.server.domain;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "Role")
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoleID")
    private Long roleId;

    @Column(name = "RoleName", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ERole roleName;
}