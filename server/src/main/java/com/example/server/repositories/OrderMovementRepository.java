package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.domain.OrderMovement;

public interface OrderMovementRepository extends JpaRepository<OrderMovement, Long> {

}
