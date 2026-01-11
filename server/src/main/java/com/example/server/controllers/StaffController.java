package com.example.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.domain.StaffAtGatheringPoint;
import com.example.server.services.StaffService;

@RestController
@RequestMapping("/api/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @GetMapping
    public List<StaffAtGatheringPoint> findAll() {
        return staffService.findAll();
    }
}
