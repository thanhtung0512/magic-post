package com.example.server.controllers;

import com.example.server.domain.OrderMovement;
import com.example.server.services.OrderMovementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/order-movements")
public class OrderMovementController {

    @Autowired
    private OrderMovementService orderMovementService;

    @GetMapping
    public List<OrderMovement> getAllOrderMovements() {
        return orderMovementService.getAllOrderMovements();
    }

    // Transaction IN 
    @GetMapping("/transaction/in/userID/{userId}")
    public ResponseEntity<List<OrderMovement>> ordersGoInSpecificTransactionPoint(
            @PathVariable("userId") Long userId) {

        List<OrderMovement> ordersGoInSpecificTransactionPoint = orderMovementService
                .ordersGoInSpecificTransactionPoint(userId);
        return ResponseEntity.ok(ordersGoInSpecificTransactionPoint);
    }

    @GetMapping("/transaction/in/transactionPointID/{transactionPointID}")
    public ResponseEntity<List<OrderMovement>> ordersGoInSpecificTransactionPointUsingTransactionPointID(
            @PathVariable("transactionPointID") Long transactionPointID) {

        List<OrderMovement> ordersGoInSpecificTransactionPoint = orderMovementService
                .ordersGoInSpecificTransactionPoint_TransactionPointID(transactionPointID);
        return ResponseEntity.ok(ordersGoInSpecificTransactionPoint);
    }

    // Transaction OUT
    @GetMapping("/transaction/out/userID/{userId}")
    public ResponseEntity<List<OrderMovement>> ordersGoOutFromSpecificTransactionPoint(
            @PathVariable("userId") Long userId) {
        List<OrderMovement> ordersGoOutFromSpecificTransactionPoint = orderMovementService
                .ordersGoOutTransactionPoint(userId);
        return ResponseEntity.ok(ordersGoOutFromSpecificTransactionPoint);

    }


    @GetMapping("/transaction/out/transactionPointID/{transactionPointID}")
    public ResponseEntity<List<OrderMovement>> ordersGoOutFromSpecificTransactionPoint_TransactionPointID(
            @PathVariable("transactionPointID") Long transactionPointID) {
        List<OrderMovement> ordersGoOutFromSpecificTransactionPoint = orderMovementService
                .ordersGoOutTransactionPoint_TransactionPointID(transactionPointID);
        return ResponseEntity.ok(ordersGoOutFromSpecificTransactionPoint);

    }

    //Gathering IN

    @GetMapping("/gathering/in/userID/{userId}")
    public ResponseEntity<List<OrderMovement>> ordersGoInSpecificGatheringPoint(
            @PathVariable("userId") Long userId) {
        List<OrderMovement> ordersGoInSpecificGatheringPoint = orderMovementService
                .ordersGoInGatheringPoint(userId);
        return ResponseEntity.ok(ordersGoInSpecificGatheringPoint);
    }


    @GetMapping("/gathering/in/gatheringPointID/{gatheringPointID}")
    public ResponseEntity<List<OrderMovement>> ordersGoInSpecificGatheringPoint_GatheringPointID(
            @PathVariable("gatheringPointID") Long gatheringPointID) {
        List<OrderMovement> ordersGoInSpecificGatheringPoint = orderMovementService
                .ordersGoInGatheringPoint_GatheringPointID(gatheringPointID);
        return ResponseEntity.ok(ordersGoInSpecificGatheringPoint);
    }


    // Gathering OUT
    @GetMapping("/gathering/out/userID/{userId}")
    public ResponseEntity<List<OrderMovement>> ordersGoOutSpecificGatheringPoint(
            @PathVariable("userId") Long userId) {
        List<OrderMovement> ordersGoOutGatheringPoint = orderMovementService
                .ordersGoOutGatheringPoint(userId);
        return ResponseEntity.ok(ordersGoOutGatheringPoint);
    }

    @GetMapping("/gathering/out/gatheringPointID/{gatheringPointID}")
    public ResponseEntity<List<OrderMovement>> ordersGoOutSpecificGatheringPoint_GatheringPointID(
            @PathVariable("gatheringPointID") Long gatheringPointID) {
        List<OrderMovement> ordersGoOutGatheringPoint = orderMovementService
                .ordersGoOutGatheringPoint_GatheringPointID(gatheringPointID);
        return ResponseEntity.ok(ordersGoOutGatheringPoint);
    }

    // Additional REST endpoints if needed
}
