package com.example.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.domain.TransactionPoint;
import com.example.server.domain.TransactionPointGatheringPoint;

public interface TransactionPointGatheringPointRepository extends JpaRepository<TransactionPointGatheringPoint, Long> {
    Optional<TransactionPointGatheringPoint> findByTransactionPoint(TransactionPoint transactionPoint);
}
