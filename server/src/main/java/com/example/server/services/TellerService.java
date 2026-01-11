package com.example.server.services;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.server.domain.Teller;
import com.example.server.repositories.TellerRepository;

@Service
public class TellerService {

    @Autowired
    private TellerRepository tellerRepository;

    public void save(Teller teller) {
        tellerRepository.save(teller);
    }

    public ResponseEntity<List<Teller>> getAll() {
        return ResponseEntity.ok(tellerRepository.findAll());
    }
}
