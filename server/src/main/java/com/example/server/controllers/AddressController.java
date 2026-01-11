package com.example.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.server.domain.Address;
import com.example.server.services.AddressService;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/closest-address")
    public Address getClosestAddress(@RequestParam double sourceLat, @RequestParam double sourceLon,
            @RequestBody List<Address> addressList) {
        Address sourceAddress = new Address();
        sourceAddress.setLatitude(sourceLat);
        sourceAddress.setLongitude(sourceLon);

        return addressService.findClosestAddress(sourceAddress, addressList);
    }
}
