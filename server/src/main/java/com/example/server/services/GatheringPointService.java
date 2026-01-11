package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.GatheringPoint;
import com.example.server.domain.TransactionPoint;
import com.example.server.repositories.GatheringPointRepository;

@Service
public class GatheringPointService {
    @Autowired
    private GatheringPointRepository gatheringPointRepository;

    public List<GatheringPoint> getAllGatheringPoints() {
        return gatheringPointRepository.findAll();
    }

    public Optional<GatheringPoint> findById(Long id) {
        return gatheringPointRepository.findById(id);
    }

    @Autowired
    private PointLeaderAtGatheringPointService pointLeaderAtGatheringPointService;

    public List<GatheringPoint> getAllGatheringPointsWithoutLeader() {
        // Get all TransactionPoint IDs that have an associated
        // PointLeaderAtTransactionPoint
        List<Long> transactionPointIdsWithLeader = pointLeaderAtGatheringPointService.getAllGatheringPointsIds();

        // Get all TransactionPoints where the ID is not in the list of TransactionPoint
        // IDs with a leader
        return gatheringPointRepository.findAllByIdNotIn(transactionPointIdsWithLeader);
    }
}
