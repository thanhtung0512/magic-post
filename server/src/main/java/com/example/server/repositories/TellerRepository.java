package com.example.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.domain.Teller;
import com.example.server.domain.User;

public interface TellerRepository extends JpaRepository<Teller,Long> {
    Optional<Teller> findByUser(User user);
}
