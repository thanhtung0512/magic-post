package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.server.domain.Customer;
import com.example.server.domain.User;
import com.example.server.dto.response.CustomerAddress;
import com.example.server.repositories.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public ResponseEntity<Customer> findByUser(User user) {
        Optional<Customer> customerOptional = customerRepository.findByUser(user);
        if (customerOptional.isPresent()) {
            return ResponseEntity.ok(customerOptional.get());
        }
        return ResponseEntity.ok(null);
    }

    public ResponseEntity<CustomerAddress> getCustomerAddress(User user) {
        CustomerAddress customerAddress = new CustomerAddress();
        Optional<Customer> customerOptional = customerRepository.findByUser(user);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            customerAddress.setLatitude(customer.getLatitude());
            customerAddress.setLongitude(customer.getLongitude());
            customerAddress.setAddress(customer.getAddress());
        }
        return ResponseEntity.ok(customerAddress);
    }
}
