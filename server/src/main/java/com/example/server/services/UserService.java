package com.example.server.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.server.domain.ERole;
import com.example.server.domain.GatheringPoint;
import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.domain.PointLeaderAtTransactionPoint;
import com.example.server.domain.Role;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.User;
import com.example.server.dto.request.CreateUserRequest;
import com.example.server.exceptions.EmailAlreadyExistsException;
import com.example.server.exceptions.UserNotFoundException;
import com.example.server.exceptions.UsernameAlreadyExistsException;
import com.example.server.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TransactionPointService transactionPointService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PointLeaderService pointLeaderService;

    @Autowired
    private GatheringPointService gatheringPointService;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public void updateUser(String currentUsername, String newUsername, String newPassword, String newEmail) {
        Optional<User> existingUser = userRepository.findByUsername(currentUsername);

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            // Check if the new username is unique
            if (!user.getUsername().equals(newUsername) && userRepository.existsByUsername(newUsername)) {
                throw new UsernameAlreadyExistsException("Username is already taken");
            }

            // Check if the new email is unique
            if (!user.getEmail().equals(newEmail) && userRepository.existsByEmail(newEmail)) {
                throw new EmailAlreadyExistsException("Email is already taken");
            }

            // Update the user
            user.setUsername(newUsername);
            user.setPassword(newPassword);
            user.setEmail(newEmail);

            userRepository.save(user);
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

    public ResponseEntity<String> create(CreateUserRequest request) {
        String newName = request.getNewName();
        String newUsername = request.getNewUsername();
        String newPassword = request.getNewPassword();
        String newEmail = request.getNewEmail();
        String phoneNumber = request.getPhoneNumber();
        Long pointID = request.getPointID(); // dont know gathering or transaction
        long numberOfTransactionPoints = transactionPointService.countAll();
        System.out.println("newName: " + newName);
        System.out.println("newUsername: " + newUsername);
        System.out.println("newPassword: " + newPassword);
        System.out.println("newEmail: " + newEmail);
        System.out.println("phoneNumber: " + phoneNumber);
        System.out.println("pointID: " + pointID);
        System.out.println("numberOfTransactionPoints: " + numberOfTransactionPoints);

        // encode password to save to db
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());

        if (pointID > numberOfTransactionPoints) { // gathering point
            System.out.println(
                    "This is pointID of Gathering Point \n Because Gathering point ID pass to server always more than lengths of transaction points ");
            Optional<GatheringPoint> gatheringPointOptional = gatheringPointService
                    .findById(pointID - numberOfTransactionPoints);
            if (gatheringPointOptional.isPresent()) {
                GatheringPoint gatheringPoint = gatheringPointOptional.get();
                System.out.println("Found gathering point with id " + pointID);

                PointLeaderAtGatheringPoint pointLeaderAtGatheringPoint = new PointLeaderAtGatheringPoint();
                pointLeaderAtGatheringPoint.setName(newName);
                pointLeaderAtGatheringPoint.setPhoneNumber(phoneNumber);
                // create user

                User user = new User();

                user.setPassword(encodedPassword);
                user.setUsername(newUsername);
                user.setEmail(newEmail);
                Set<Role> roles = new HashSet<>();
                Role pointLeaderRole = new Role();
                Long roleID = new Long(2);
                pointLeaderRole.setRoleId(roleID);
                pointLeaderRole.setRoleName(ERole.ROLE_POINTLEADER);
                roles.add(pointLeaderRole);
                user.setRole(roles);

                // saving user

                userRepository.save(user);

                pointLeaderAtGatheringPoint.setUser(user);
                pointLeaderAtGatheringPoint.setGatheringPoint(gatheringPoint);
                pointLeaderService.savePointLeaderAtGatheringPoint(pointLeaderAtGatheringPoint);
                System.out.println("Saved point leader Gathering successfully");

            } else {
                System.out.println(" NOT Found gathering point with id " + pointID);
            }
        } else { // transaction point
            Optional<TransactionPoint> transactionPointOptional = transactionPointService.findById(pointID);
            if (transactionPointOptional.isPresent()) {
                TransactionPoint transactionPoint = transactionPointOptional.get();

                PointLeaderAtTransactionPoint pointLeaderAtTransactionPoint = new PointLeaderAtTransactionPoint();
                pointLeaderAtTransactionPoint.setName(newName);
                pointLeaderAtTransactionPoint.setPhoneNumber(phoneNumber);

                User user = new User();

                user.setPassword(encodedPassword);
                user.setUsername(newUsername);
                user.setEmail(newEmail);
                Set<Role> roles = new HashSet<>();
                Role pointLeaderRole = new Role();
                Long roleID = new Long(2);
                pointLeaderRole.setRoleId(roleID);
                pointLeaderRole.setRoleName(ERole.ROLE_POINTLEADER);
                roles.add(pointLeaderRole);
                user.setRole(roles);

                // saving user

                userRepository.save(user);
                pointLeaderAtTransactionPoint.setUser(user);
                pointLeaderAtTransactionPoint.setTransactionPoint(transactionPoint);
                pointLeaderService.savePointLeaderTransactionPoint(pointLeaderAtTransactionPoint);
                System.out.println("CREATED POINT LEADER SUCCESSFULLY");

                System.out.println("TransactionPoint found: " + transactionPoint.getName());
            } else {
                System.out.println("TransactionPoint not found");
            }
        }
        return ResponseEntity.ok("Updated successfully");
    }
}
