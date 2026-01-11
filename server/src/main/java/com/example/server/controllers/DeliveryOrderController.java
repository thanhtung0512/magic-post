package com.example.server.controllers;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.server.domain.DeliveryOrder;
import com.example.server.domain.GatheringPoint;
import com.example.server.domain.OrderMovement;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.User;
import com.example.server.dto.request.TellerCreateOrder;
import com.example.server.repositories.OrderMovementRepository;
import com.example.server.services.DeliveryOrderService;
import com.example.server.services.TransactionPointGatheringPointService;
import com.example.server.services.UserService;
import com.example.server.utilities.StatusOrderConstant;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/delivery-orders")
public class DeliveryOrderController {

    @Autowired
    private TransactionPointGatheringPointService transactionPointGatheringPointService;

    @Autowired
    private OrderMovementRepository orderMovementRepository;

    @Autowired
    private StatusOrderConstant statusOrderConstant;

    @Autowired
    private UserService userService;

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    // Get all delivery orders
    @GetMapping
    public List<DeliveryOrder> getAllDeliveryOrders() throws JsonProcessingException {
        return deliveryOrderService.getAllDeliveryOrders();
    }

    // Get delivery order by ID
    @GetMapping("/{orderID}")
    public Optional<DeliveryOrder> getDeliveryOrderById(@PathVariable Long orderID) {
        return deliveryOrderService.getDeliveryOrderById(orderID);
    }

    @PostMapping("/{orderID}/status")
    // @PreAuthorize("hasRole('BOSS')")
    public ResponseEntity<String> updateDeliveryOrderStatus(
            @PathVariable Long orderID,
            @RequestBody UpdateStatusRequest updateStatusRequest) {
        try {
            Optional<DeliveryOrder> optionalDeliveryOrder = deliveryOrderService.getDeliveryOrderById(orderID);

            if (optionalDeliveryOrder.isPresent()) {
                String status = updateStatusRequest.getStatus();
                DeliveryOrder deliveryOrder = optionalDeliveryOrder.get();
                System.out.println("Status: " + status);

                // transaction point - gathering point of sender
                TransactionPoint senderTransactionPoint = getSenderTransactionFromDeliveryOrder(deliveryOrder);
                GatheringPoint senderGatheringPoint = getSenderGatheringPointFromDeliveryOrder(deliveryOrder);

                // transaction point - gathering point of receiver
                TransactionPoint recipientTransactionPoint = getRecipientTransactionPointFromDeliveryOrder(
                        deliveryOrder);
                GatheringPoint recipientGatheringPoint = getRecipientGatheringPointFromDeliveryOrder(deliveryOrder);
                if (status.equals(statusOrderConstant.WAITING_SENDER_GATHERING_POINT_ACCEPT)) {
                    // from sender transaction to sender gathering
                    // must get sender transaction and sender gathering from variable: deliveryOrder

                    // OrderMovement orderMovement = new OrderMovement();
                    // orderMovement.setDeliveryOrder(deliveryOrder);
                    // orderMovement.setTransactionPoint(senderTransactionPoint);
                    // orderMovement.setGatheringPoint(senderGatheringPoint);
                    // orderMovement.setMovementType("IN");
                    // orderMovement.setMovementDate(today());
                    // orderMovement.setDestGatheringPoint(null);
                    saveOrderMovement(deliveryOrder, senderTransactionPoint, senderGatheringPoint, "IN", null);
                } else if (status.equals(statusOrderConstant.WAITING_RECIPIENT_GATHERING_POINT_ACCEPT)) {
                    // pass from sender gathering -> receiverGathering
                    saveOrderMovement(deliveryOrder, null, senderGatheringPoint, "IN", recipientGatheringPoint);

                } else if (status.equals(statusOrderConstant.FORWARD_TO_DESTINATION_TRANSACTION)) {
                    // pass from receiver gathering point -> receiver transaction point
                    saveOrderMovement(deliveryOrder, recipientTransactionPoint, recipientGatheringPoint, "OUT", null);
                }
                // Assuming you have a setStatus method in your DeliveryOrder class
                deliveryOrder.setStatus(status);
                deliveryOrderService.saveDeliveryOrder(deliveryOrder); // Save the updated delivery order

                // create orderMovement here
                // step 1. get all information

                // step 2. check status before and after
                return ResponseEntity.ok("Status updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("Delivery order not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to update status");
        }
    }

    private void saveOrderMovement(DeliveryOrder deliveryOrder, TransactionPoint senderTransactionPoint,
            GatheringPoint senderGatheringPoint, String movementType, GatheringPoint destGatheringPoint) {
        OrderMovement orderMovement = new OrderMovement();
        orderMovement.setDeliveryOrder(deliveryOrder);
        orderMovement.setTransactionPoint(senderTransactionPoint);
        orderMovement.setGatheringPoint(senderGatheringPoint);
        // orderMovement.setMovementType("IN");
        orderMovement.setMovementType(movementType);

        orderMovement.setMovementDate(today());
        orderMovement.setDestGatheringPoint(destGatheringPoint);

        orderMovementRepository.save(orderMovement);

    }

    private TransactionPoint getSenderTransactionFromDeliveryOrder(DeliveryOrder deliveryOrder) {
        return deliveryOrder.getSenderTransactionPoint();
    }

    private TransactionPoint getRecipientTransactionPointFromDeliveryOrder(DeliveryOrder deliveryOrder) {
        return deliveryOrder.getRecipientTransactionPoint();
    }

    private GatheringPoint getSenderGatheringPointFromDeliveryOrder(DeliveryOrder deliveryOrder) {
        return deliveryOrder.getSenderGatheringPoint();
    }

    private GatheringPoint getRecipientGatheringPointFromDeliveryOrder(DeliveryOrder deliveryOrder) {
        TransactionPoint linkedTransactionPoint = getRecipientTransactionPointFromDeliveryOrder(deliveryOrder);
        return transactionPointGatheringPointService.findByTransactionPoint(linkedTransactionPoint).get()
                .getGatheringPoint();

    }

    private Date today() {
        java.util.Date currentDate = new java.util.Date();

        // Convert to java.sql.Date
        Date sqlDate = new Date(currentDate.getTime());
        return sqlDate;
    }

    @GetMapping("/get-by-status/{status}/{userId}")
    public ResponseEntity<List<DeliveryOrder>> getByStatus(@PathVariable("status") String status,
            @PathVariable("userId") Long userId) {
        return ResponseEntity.ok(deliveryOrderService.findByStatus(status, userId));
    }

    @PostMapping("/create")
    public ResponseEntity<String> tellerCreateOrder(@RequestBody TellerCreateOrder tellerCreateOrder) {
        // get all information from request body
        deliveryOrderService.createOrder(tellerCreateOrder);

        return ResponseEntity.ok("Create order successfully");
    }

    @GetMapping("/countAll")
    public ResponseEntity<Long> countAll() {
        return ResponseEntity.ok(deliveryOrderService.countAllDeliveryOrders());
    }

    @GetMapping("/count-by-status/{status}")
    public ResponseEntity<Long> countByStatus(@PathVariable("status") String status) {
        return ResponseEntity.ok(deliveryOrderService.countDeliveryOrdersByStatus(status));
    }

    @GetMapping("/sum-prices")
    public ResponseEntity<Long> getSumPrice() {
        return ResponseEntity.ok(new Long(deliveryOrderService.getSumOfPrices()));
    }

    // get orders from specific point (transaction/ gathering) (userId teller/staff)
    // , status
    // @GetMapping("/{userId}/{status}")
    @GetMapping("/count-by-months")
    public ResponseEntity<List<Map<String, Object>>> countDeliveryByMonths() {
        List<Map<String, Object>> result = deliveryOrderService.countDeliveryByMonths();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/count-by-status-on-each-month")
    public ResponseEntity<List<Map<String, Object>>> countOrdersByStatusOnEachMonth() {
        List<Map<String, Object>> result = deliveryOrderService.countOrdersByStatusOnEachMonth();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/sum-prices-by-status-on-each-month")
    public ResponseEntity<List<Map<String, Object>>> sumPricesByStatusOnEachMonth() {
        List<Map<String, Object>> result = deliveryOrderService.sumPricesByStatusOnEachMonth();
        return ResponseEntity.ok(result);
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
