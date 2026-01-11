package com.example.server.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.domain.PointLeaderAtTransactionPoint;
import com.example.server.repositories.PointLeaderAtGatheringPointRepository;

@Service
public class PointLeaderAtGatheringPointService {
    @Autowired
    private PointLeaderAtGatheringPointRepository pointLeaderAtGatheringPointRepository;

    public List<Long> getAllGatheringPointsIds() {
        List<PointLeaderAtGatheringPoint> pointLeaderAtGatheringPoints = pointLeaderAtGatheringPointRepository
                .findAll();

        // Extract TransactionPoint IDs from the entities
        return pointLeaderAtGatheringPoints.stream()
                .map(pointLeader -> pointLeader.getGatheringPoint().getGatheringPointId())
                .collect(Collectors.toList());
    }

}
