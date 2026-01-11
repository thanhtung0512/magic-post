package com.example.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.domain.User;

@Repository
public interface PointLeaderAtGatheringPointRepository
        extends JpaRepository<PointLeaderAtGatheringPoint, Long> {
    List<PointLeaderAtGatheringPoint> findAll();

    Optional<PointLeaderAtGatheringPoint> findById(Long id);

    Optional<PointLeaderAtGatheringPoint> findByUser(User user);
}
