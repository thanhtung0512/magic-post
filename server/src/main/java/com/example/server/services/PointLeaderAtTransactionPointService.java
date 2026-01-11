package com.example.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.server.domain.PointLeaderAtTransactionPoint;
import com.example.server.repositories.PointLeaderAtTransactionPointRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointLeaderAtTransactionPointService {

    @Autowired
    private PointLeaderAtTransactionPointRepository pointLeaderAtTransactionPointRepository;

    public List<Long> getAllTransactionPointIds() {
        // Get all PointLeaderAtTransactionPoint entities
        List<PointLeaderAtTransactionPoint> pointLeaderAtTransactionPoints = pointLeaderAtTransactionPointRepository.findAll();

        // Extract TransactionPoint IDs from the entities
        return pointLeaderAtTransactionPoints.stream()
                .map(pointLeader -> pointLeader.getTransactionPoint().getTransactionPointId())
                .collect(Collectors.toList());
    }
}
