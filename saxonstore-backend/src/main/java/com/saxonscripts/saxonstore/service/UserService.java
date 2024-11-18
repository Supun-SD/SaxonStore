package com.saxonscripts.saxonstore.service;
import com.saxonscripts.saxonstore.dto.LoginRequestDTO;
import com.saxonscripts.saxonstore.dto.LoginResponseDTO;
import com.saxonscripts.saxonstore.dto.UserDTO;
import com.saxonscripts.saxonstore.exception.ResourceNotFoundException;
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
import java.util.UUID;

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

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
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
                    return modelMapper.map(user, LoginResponseDTO.class);//login successful
                } else {
                    return null; // User not found
                }
            } else {
                return null; // Authentication failed
            }
        } catch (AuthenticationException e) {
            return null; // Login failed
        }
    }

    public UserDTO getUserByEmail(String email) {
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return modelMapper.map(userOptional.get(), UserDTO.class);
    }

    public void updatePassword(String email, String newPassword) {
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepo.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public UserDTO updateUser(UUID id, UserDTO userDTO) {
        User existingUser = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setAddress(userDTO.getAddress());
        existingUser.setCity(userDTO.getCity());
        existingUser.setPostalCode(userDTO.getPostalCode());
        existingUser.setPhone(userDTO.getPhone());

        User updatedUser = userRepo.save(existingUser);
        return modelMapper.map(updatedUser, UserDTO.class);
    }
}
