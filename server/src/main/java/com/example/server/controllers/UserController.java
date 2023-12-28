package com.example.server.controllers;

import java.util.Optional;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.domain.GatheringPoint;
import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.domain.PointLeaderAtTransactionPoint;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.User;
import com.example.server.dto.request.UpdateUserRequest;
import com.example.server.services.GatheringPointService;
import com.example.server.services.PointLeaderService;
import com.example.server.services.TransactionPointService;
import com.example.server.services.UserService;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PointLeaderService pointLeaderService;

    @Autowired
    private TransactionPointService transactionPointService;

    @Autowired
    private GatheringPointService gatheringPointService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserRequest request) {

        long numberOfTransactionPoints = transactionPointService.countAll();
        Long pointID = request.getPointID();
        Long leaderID = request.getLeaderID();

        System.out.println("currentUserName: " + request.getCurrentUsername() + "\n newUserName: "
                + request.getNewUsername() + "\nnewPassword:"
                + request.getNewPassword() + "\nnewEmail: " + request.getNewEmail() + "\nPhoneNumber:"
                + request.getPhoneNumber() + "\npointId: " + request.getPointID() + "\nleaderID: "
                + request.getLeaderID() + "\n newName: " + request.getNewName());

        // Encode the new password before updating the user
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());

        userService.updateUser(request.getCurrentUsername(), request.getNewUsername(), encodedPassword,
                request.getNewEmail());
        Optional<User> userOptional = userService.findByUsername(request.getNewUsername()); // for sure exist

        // find one of two point leader and check it later
        Optional<PointLeaderAtGatheringPoint> pointLeaderAtGatheringPointOptional = pointLeaderService
                .getPointLeaderGatheringPointById(leaderID);
        Optional<PointLeaderAtTransactionPoint> pointLeaderAtTransactionPointOptional = pointLeaderService
                .getPointLeaderAtTransactionPoint(leaderID);

        //
        if (pointID > numberOfTransactionPoints) { // gathering point
            System.out.println(
                    "This is pointID of Gathering Point \n Because Gathering point ID pass to server always more than lengths of transaction points ");
            Optional<GatheringPoint> gatheringPointOptional = gatheringPointService
                    .findById(pointID - numberOfTransactionPoints);
            if (gatheringPointOptional.isPresent()) {
                GatheringPoint gatheringPoint = gatheringPointOptional.get();
                System.out.println("Found gathering point with id " + pointID);
                if (pointLeaderAtGatheringPointOptional.isPresent()) {
                    PointLeaderAtGatheringPoint pointLeaderAtGatheringPoint = pointLeaderAtGatheringPointOptional
                            .get();
                    pointLeaderAtGatheringPoint.setName(request.getNewName());
                    pointLeaderAtGatheringPoint.setPhoneNumber(request.getPhoneNumber());
                    pointLeaderAtGatheringPoint.setUser(userOptional.get());
                    pointLeaderAtGatheringPoint.setGatheringPoint(gatheringPoint);
                    pointLeaderService.savePointLeaderAtGatheringPoint(pointLeaderAtGatheringPoint);
                    System.out.println("Saved point leader Gathering successfully");
                }
            } else {
                System.out.println(" NOT Found gathering point with id " + pointID);
            }
        } else { // transaction point
            Optional<TransactionPoint> transactionPointOptional = transactionPointService.findById(pointID);
            if (transactionPointOptional.isPresent()) {
                TransactionPoint transactionPoint = transactionPointOptional.get();
                if (pointLeaderAtTransactionPointOptional.isPresent()) {
                    PointLeaderAtTransactionPoint pointLeaderAtTransactionPoint = pointLeaderAtTransactionPointOptional
                            .get();
                    pointLeaderAtTransactionPoint.setName(request.getNewName());
                    pointLeaderAtTransactionPoint.setPhoneNumber(request.getPhoneNumber());
                    pointLeaderAtTransactionPoint.setUser(userOptional.get());
                    pointLeaderAtTransactionPoint.setTransactionPoint(transactionPoint);
                    pointLeaderService.savePointLeaderTransactionPoint(pointLeaderAtTransactionPoint);
                    System.out.println("Saved point leader successfully");
                }
                System.out.println("TransactionPoint found: " + transactionPoint.getName());
            } else {
                System.out.println("TransactionPoint not found");
            }
        }
        return ResponseEntity.ok("Updated successfully");
    }
}
