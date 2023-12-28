package com.example.server.repositories;

import com.example.server.domain.DeliveryOrder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository(value = "deliveryOrderRepository")
public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {
    
}
