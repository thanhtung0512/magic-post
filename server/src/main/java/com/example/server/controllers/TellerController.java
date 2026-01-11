package com.example.server.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.domain.ERole;
import com.example.server.domain.Role;
import com.example.server.domain.Teller;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.User;
import com.example.server.dto.request.CreateTellerRequest;
import com.example.server.services.TellerService;
import com.example.server.services.TransactionPointService;
import com.example.server.services.UserService;

@RestController
@RequestMapping("/api/teller")
public class TellerController {

    @Autowired
    private TransactionPointService transactionPointService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private TellerService tellerService;


    @GetMapping
    public ResponseEntity<List<Teller>> getAll() {
        return tellerService.getAll();
    }


    @PostMapping("/create")
    public ResponseEntity<String> createTellerAccount(@RequestBody CreateTellerRequest createTellerRequest) {
        String username = createTellerRequest.getUsername();
        String email = createTellerRequest.getEmail();
        String password = createTellerRequest.getPassword();
        String name = createTellerRequest.getName();
        String phoneNumber = createTellerRequest.getPhoneNumber();
        Long transactionPointID = createTellerRequest.getTransactionPointID();
        Optional<TransactionPoint> transactionPointOptional = transactionPointService.findById(transactionPointID);
        if (transactionPointOptional.isPresent()) {
            TransactionPoint transactionPoint = transactionPointOptional.get();
            User user = new User();
            String encodedPassword = passwordEncoder.encode(password);
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(encodedPassword);
            Set<Role> roles = new HashSet<>();
            Long roleId = new Long(3);
            Role tellerRole = new Role(roleId, ERole.ROLE_TELLER);
            roles.add(tellerRole);
            user.setRole(roles);
            userService.save(user);
            Teller teller = new Teller();
            teller.setName(name);
            teller.setPhoneNumber(phoneNumber);
            teller.setTransactionPoint(transactionPoint);
            teller.setUser(user);
            tellerService.save(teller);
            return ResponseEntity.ok("GRANT TELLER ACCOUNT SUCCESSFULLY");
        }
        return ResponseEntity.ok("Could not create Teller Account!!!!");
    }
}
