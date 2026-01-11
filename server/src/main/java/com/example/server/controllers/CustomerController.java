package com.example.server.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.domain.Customer;
import com.example.server.domain.User;
import com.example.server.dto.response.CustomerAddress;
import com.example.server.services.CustomerService;
import com.example.server.services.UserService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Customer> findAll() {
        return customerService.findAll();
    }

    @GetMapping("/by-user-id/{userId}")
    public ResponseEntity<Customer> findByUser(@PathVariable("userId") Long userId) {
        Optional<User> user = userService.findById(userId);
        return customerService.findByUser(user.get());

    }

    @GetMapping("/get-address/{userId}")
    public ResponseEntity<CustomerAddress> getAddress(@PathVariable("userId") Long userId) {
        Optional<User> user = userService.findById(userId);
        return customerService.getCustomerAddress(user.get());
    }

}
