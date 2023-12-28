package com.example.server.repositories;

import com.example.server.domain.TransactionPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionPointRepository extends JpaRepository<TransactionPoint, Long> {

    // Add method to get all TransactionPoints
    List<TransactionPoint> findAll();

    long count();

    Optional<TransactionPoint> findById(Long id);
}
