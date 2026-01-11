package com.example.server.controllers;

import com.example.server.domain.TransactionPoint;
import com.example.server.repositories.TransactionPointRepository;
import com.example.server.services.TransactionPointService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transaction-points")
public class TransactionPointController {

    // private final TransactionPointRepository transactionPointRepository;

    private final TransactionPointService transactionPointService;

    @Autowired
    public TransactionPointController(TransactionPointService transactionPointService) {
        this.transactionPointService = transactionPointService;
    }

    @GetMapping
    public List<TransactionPoint> getAllTransactionPoints() {
        return transactionPointService.getAllTransactionPoints();
    }

    @GetMapping("/without-leader")
    public List<TransactionPoint> getAllTransactionPointsWithoutLeader() {
        return transactionPointService.getAllTransactionPointsWithoutLeader();
    }
}
