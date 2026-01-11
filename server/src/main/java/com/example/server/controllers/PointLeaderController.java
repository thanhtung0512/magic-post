package com.example.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.domain.PointLeader;
import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.services.PointLeaderService;

@RestController
@RequestMapping("/api/point-leaders")
public class PointLeaderController {

    @Autowired
    private PointLeaderService pointLeaderService;

    @GetMapping
    public List<PointLeader> getAllPointLeaders() {
        return pointLeaderService.getAllPointLeader();
    }

}
