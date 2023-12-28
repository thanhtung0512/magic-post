package com.example.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.domain.PointLeaderAtGatheringPoint;

@Repository
public interface PointLeaderAtGatheringPointRepository
        extends JpaRepository<PointLeaderAtGatheringPoint, Long> {
    List<PointLeaderAtGatheringPoint> findAll();

    Optional<PointLeaderAtGatheringPoint> findById(Long id);
}
