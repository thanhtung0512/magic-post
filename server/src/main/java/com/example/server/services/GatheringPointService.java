package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.GatheringPoint;
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
}
