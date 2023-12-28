package com.example.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.User;
import com.example.server.exceptions.EmailAlreadyExistsException;
import com.example.server.exceptions.UserNotFoundException;
import com.example.server.exceptions.UsernameAlreadyExistsException;
import com.example.server.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
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
}
