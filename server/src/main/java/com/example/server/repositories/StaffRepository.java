package com.example.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.domain.StaffAtGatheringPoint;
import com.example.server.domain.User;

public interface StaffRepository extends JpaRepository<StaffAtGatheringPoint, Long> {
    Optional<StaffAtGatheringPoint> findByUser(User user);
}
