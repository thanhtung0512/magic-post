package com.example.server.repositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.domain.PointLeaderAtTransactionPoint;

@Repository
public interface PointLeaderAtTransactionPointRepository
        extends JpaRepository<PointLeaderAtTransactionPoint, Long> {
    List<PointLeaderAtTransactionPoint> findAll();
    Optional<PointLeaderAtTransactionPoint> findById(Long id);
}
