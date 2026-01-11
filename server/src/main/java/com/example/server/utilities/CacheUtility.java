package com.example.server.utilities;

import com.example.server.domain.CacheData;
import com.example.server.domain.DeliveryOrder;
import com.example.server.repositories.CacheDataRepository;
import com.example.server.repositories.DeliveryOrderRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CacheUtility {
    @Autowired
    private CacheDataRepository cacheDataRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DeliveryOrderRepository deliveryOrderRepository;

    public List<DeliveryOrder> getAllDeliveryOrders() throws JsonProcessingException {
        List<DeliveryOrder> orders = new ArrayList<>();
        String allOrderKey = "allOrders";
        Optional<CacheData> ordersInRedisCache = cacheDataRepository.findById(allOrderKey);
        if (ordersInRedisCache.isPresent()) {
            System.out.println("Get all orders from Redis Cache");
            String allOrdersJson = ordersInRedisCache.get().getValue();
            TypeReference<List<DeliveryOrder>> mapType = new TypeReference<>() {

            };
            orders = objectMapper.readValue(allOrdersJson, mapType);
            return orders;
        }
        orders = deliveryOrderRepository.findAll();
        String ordersAsJson = objectMapper.writeValueAsString(orders);
        CacheData ordersData = new CacheData(allOrderKey, ordersAsJson);
        cacheDataRepository.save(ordersData);
        return orders;
    }

    public Optional<DeliveryOrder> getDeliveryOrderById(Long orderID) {
        try {
            String orderKey = "Order " + orderID;
            Optional<DeliveryOrder> finalOrder;
            Optional<CacheData> orderInCache = cacheDataRepository.findById(orderKey);
            if (orderInCache.isPresent()) {
                System.out.println("Get order id " + orderID + " from Redis cache");
                String orderAsJson = orderInCache.get().getValue();
                TypeReference<Optional<DeliveryOrder>> mapType = new TypeReference<Optional<DeliveryOrder>>() {

                };
                finalOrder = objectMapper.readValue(orderAsJson, mapType);
                return finalOrder;
            }
            System.out.println("Getting from database...");
            finalOrder = deliveryOrderRepository.findById(orderID);
            String orderAsJson = objectMapper.writeValueAsString(finalOrder);
            CacheData orderData = new CacheData(orderKey, orderAsJson);
            cacheDataRepository.save(orderData);
            return finalOrder;

        } catch (Exception e) {
            System.out.println("Order not found with ID: " + orderID);
        }
        return null;

    }
}
