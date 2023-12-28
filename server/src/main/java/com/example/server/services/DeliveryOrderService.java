package com.example.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.DeliveryOrder;
import com.example.server.exceptions.OrderNotFoundException;
import com.example.server.repositories.DeliveryOrderRepository;
import com.example.server.utilities.CacheUtility;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryOrderService {

    @Autowired
    private DeliveryOrderRepository deliveryOrderRepository;

    @Autowired
    private CacheUtility cacheUtility;

    public List<DeliveryOrder> getAllDeliveryOrders() throws JsonProcessingException {
        return cacheUtility.getAllDeliveryOrders();
    }

    public Optional<DeliveryOrder> getDeliveryOrderById(Long orderID) {
        try {
            return cacheUtility.getDeliveryOrderById(orderID);
        } catch (Exception e) {
            System.out.println("Order not found with ID: " + orderID);
        }
        return null;

    }

    public void saveDeliveryOrder(DeliveryOrder deliveryOrder) {
        deliveryOrderRepository.save(deliveryOrder);
    }
}
