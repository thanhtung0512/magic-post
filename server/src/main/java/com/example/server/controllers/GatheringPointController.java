package com.example.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.domain.GatheringPoint;
import com.example.server.services.GatheringPointService;

@RestController
@RequestMapping("/api/gathering-points")
public class GatheringPointController {
    @Autowired
    private GatheringPointService gatheringPointService;

    @GetMapping
    public ResponseEntity<List<GatheringPoint>> getAllGatheringPoints() {
        return ResponseEntity.ok(gatheringPointService.getAllGatheringPoints());
    }
}
