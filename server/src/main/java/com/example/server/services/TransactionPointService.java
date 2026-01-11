package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.TransactionPoint;
import com.example.server.repositories.TransactionPointRepository;

@Service
public class TransactionPointService {

    @Autowired
    private TransactionPointRepository transactionPointRepository;

    public List<TransactionPoint> getAllTransactionPoints() {
        return transactionPointRepository.findAll();
    }

    public long countAll() {
        return transactionPointRepository.count();
    }

    public Optional<TransactionPoint> findById(Long id) {
        return transactionPointRepository.findById(id);
    }

    @Autowired
    private PointLeaderAtTransactionPointService pointLeaderAtTransactionPointService;

    public List<TransactionPoint> getAllTransactionPointsWithoutLeader() {
        // Get all TransactionPoint IDs that have an associated
        // PointLeaderAtTransactionPoint
        List<Long> transactionPointIdsWithLeader = pointLeaderAtTransactionPointService.getAllTransactionPointIds();

        // Get all TransactionPoints where the ID is not in the list of TransactionPoint
        // IDs with a leader
        return transactionPointRepository.findAllByIdNotIn(transactionPointIdsWithLeader);
    }
}