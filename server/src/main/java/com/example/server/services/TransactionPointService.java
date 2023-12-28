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
}