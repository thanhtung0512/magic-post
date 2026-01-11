package com.example.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.domain.Customer;
import com.example.server.domain.User;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findAll();

    Optional<Customer> findByUser(User user);
}
