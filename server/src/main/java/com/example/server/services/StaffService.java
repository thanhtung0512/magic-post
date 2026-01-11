package com.example.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.StaffAtGatheringPoint;
import com.example.server.repositories.StaffRepository;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;

    public List<StaffAtGatheringPoint> findAll() {
        return staffRepository.findAll();
    }
}
