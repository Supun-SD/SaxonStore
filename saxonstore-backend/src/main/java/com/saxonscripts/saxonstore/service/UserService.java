package com.saxonscripts.saxonstore.service;
import com.saxonscripts.saxonstore.dto.LoginRequestDTO;
import com.saxonscripts.saxonstore.dto.UserDTO;
import com.saxonscripts.saxonstore.model.User;
import com.saxonscripts.saxonstore.repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public List<UserDTO> getAllUsers(){
        List<User> userList = userRepo.findAll();
        return modelMapper.map(userList, new TypeToken<List<UserDTO>>(){}.getType());
    }

    public UserDTO createUser(UserDTO userDTO) {
        Optional<User> existingUser = userRepo.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with email: " + userDTO.getEmail());
        }
        User user = modelMapper.map(userDTO, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("CUSTOMER");
        user = userRepo.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    public boolean login(LoginRequestDTO loginRequestDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
            );
            if (authentication.isAuthenticated()) {
                // Fetch the user's details from the database to get the role
                Optional<User> userOptional = userRepo.findByEmail(loginRequestDTO.getEmail());
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    loginRequestDTO.setRole(user.getRole());
                    return true;
                } else {
                    return false; // User not found
                }
            } else {
                return false; // Authentication failed
            }
        } catch (AuthenticationException e) {
            return false; // Login failed
        }
    }

    public UserDTO getUserByEmail(String email) {
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return modelMapper.map(userOptional.get(), UserDTO.class);
    }

    
}
