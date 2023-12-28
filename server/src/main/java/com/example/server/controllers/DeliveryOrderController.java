package com.example.server.controllers;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.server.domain.DeliveryOrder;
import com.example.server.services.DeliveryOrderService;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/delivery-orders")
public class DeliveryOrderController {

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    // Get all delivery orders
    @GetMapping
    @PreAuthorize("hasRole('BOSS')")
    public List<DeliveryOrder> getAllDeliveryOrders() throws JsonProcessingException {
        return deliveryOrderService.getAllDeliveryOrders();
    }

    // Get delivery order by ID
    @GetMapping("/{orderID}")
    @PreAuthorize("hasRole('BOSS')")
    public Optional<DeliveryOrder> getDeliveryOrderById(@PathVariable Long orderID) {
        return deliveryOrderService.getDeliveryOrderById(orderID);
    }

    @PostMapping("/{orderID}/status")
    @PreAuthorize("hasRole('BOSS')")
    public ResponseEntity<String> updateDeliveryOrderStatus(
            @PathVariable Long orderID,
            @RequestBody UpdateStatusRequest updateStatusRequest
    ) {
        try {
            Optional<DeliveryOrder> optionalDeliveryOrder = deliveryOrderService.getDeliveryOrderById(orderID);

            if (optionalDeliveryOrder.isPresent()) {
                DeliveryOrder deliveryOrder = optionalDeliveryOrder.get();
                // Assuming you have a setStatus method in your DeliveryOrder class
                deliveryOrder.setStatus(updateStatusRequest.getStatus());
                deliveryOrderService.saveDeliveryOrder(deliveryOrder); // Save the updated delivery order
                return ResponseEntity.ok("Status updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("Delivery order not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to update status");
        }
    }

    // Class for the request body when updating the status
    public static class UpdateStatusRequest {
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
