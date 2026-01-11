package com.example.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.domain.TransactionPointGatheringPoint;
import com.example.server.services.TransactionPointGatheringPointService;

@RestController
@RequestMapping("/api/transaction-gathering")
public class TransactionPointGatheringPointController {

    @Autowired
    private TransactionPointGatheringPointService transactionPointGatheringPointService;

    @GetMapping
    public ResponseEntity<List<TransactionPointGatheringPoint>> getAll() {
        return ResponseEntity.ok(transactionPointGatheringPointService.allTransactionPointGatheringPointLinking());
    }
}
