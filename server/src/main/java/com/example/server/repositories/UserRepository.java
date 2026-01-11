package com.example.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.domain.User;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByUserId(Long userId);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findByUsernameAndEmail(String username, String email);

    void deleteByUsername(String username);
}