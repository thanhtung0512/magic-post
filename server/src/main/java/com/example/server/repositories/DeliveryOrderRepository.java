package com.example.server.repositories;

import com.example.server.domain.DeliveryOrder;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository(value = "deliveryOrderRepository")
public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {
    List<DeliveryOrder> findByStatus(String status);

    long count();

    // Optionally, you can also add a method to count by status
    long countByStatus(String status);
    @Query("SELECT SUM(d.price) FROM DeliveryOrder d")
    int getSumOfPrices();

    @Query("SELECT MONTH(d.date) as month, COUNT(d) as orders FROM DeliveryOrder d GROUP BY MONTH(d.date)")
    List<Object[]> countDeliveryByMonths();

    @Query("SELECT MONTH(d.date) as month, " +
           "SUM(CASE WHEN d.status = 'Delivered Successfully' THEN 1 ELSE 0 END) as completed, " +
           "SUM(CASE WHEN d.status = 'Failed, return to transaction point' THEN 1 ELSE 0 END) as failed " +
           "FROM DeliveryOrder d GROUP BY MONTH(d.date)")
    List<Object[]> countOrdersByStatusOnEachMonth();
    
    @Query("SELECT MONTH(d.date) as month, " +
           "SUM(CASE WHEN d.status = 'Delivered Successfully' THEN d.price ELSE 0 END) as completedPrice, " +
           "SUM(CASE WHEN d.status = 'Failed, return to transaction point' THEN d.price ELSE 0 END) as failedPrice " +
           "FROM DeliveryOrder d GROUP BY MONTH(d.date)")
    List<Object[]> sumPricesByStatusOnEachMonth();
}
