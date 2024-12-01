package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import com.saxonscripts.saxonstore.dto.UserDTO;
import com.saxonscripts.saxonstore.dto.LoginRequestDTO;
import com.saxonscripts.saxonstore.dto.LoginResponseDTO;
import com.saxonscripts.saxonstore.service.UserService;
import com.saxonscripts.saxonstore.util.EmailService;

import jakarta.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.List;
//import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

     private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtEncoder encoder;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private EmailService emailService;

    private String generateToken(LoginResponseDTO user) {
        Instant now = Instant.now();
        long expiry = 36000L;
        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(user.getEmail()) // Set the subject to the email
                .claim("userId", user.getUserId().toString())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .claim("phone", user.getPhone())
                .claim("address", user.getAddress() != null ? user.getAddress() : "")
                .claim("city", user.getCity() != null ? user.getCity() : "")
                .claim("postalCode", user.getPostalCode() != null ? user.getPostalCode() : "")
                .claim("role", user.getRole())
                .build();
        // @formatter:on
        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    private String generateResetToken(String email, String tempToken) {
        Instant now = Instant.now();
        long expiry = 3600L;
        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(email)
                .claim("tempToken", tempToken)
                .build();
        // @formatter:on
        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    @GetMapping("/getUsers")
    public ResponseWrapper<List<UserDTO>> getUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return new ResponseWrapper<>(HttpStatus.OK.value(), "SUCCESS", "Fetched users successfully", users);
    }

    @PostMapping("/createUser")
    public ResponseWrapper<UserDTO> createUsers(@RequestBody UserDTO userDTO) {
        try {
            UserDTO createdUser = userService.createUser(userDTO);
            return new ResponseWrapper<>(HttpStatus.OK.value(), "SUCCESS", "User created successfully", createdUser);
        } catch (RuntimeException e) {
            return new ResponseWrapper<>(HttpStatus.BAD_REQUEST.value(), "FAILURE", e.getMessage(), null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseWrapper<String>> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO user = userService.login(loginRequestDTO);
        if (user != null) {
            String token = generateToken(user);
            return ResponseEntity.ok(
                    new ResponseWrapper<>(HttpStatus.OK.value(), "SUCCESS", "Login successful", token)
            );
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseWrapper<>(HttpStatus.UNAUTHORIZED.value(), "FAILURE", "Invalid email or password", null)
            );
        }
    }

    @PutMapping("/update/{id}")
    public ResponseWrapper<UserDTO> updateUser(@PathVariable UUID id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return new ResponseWrapper<>(HttpStatus.OK.value(), "SUCCESS", "User updated successfully", updatedUser);
    }

    @PostMapping("/forgotPassword")
    public ResponseWrapper<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String returnUrl = request.get("returnUrl");
        UserDTO user = userService.getUserByEmail(email);
        if (user == null) {
            return new ResponseWrapper<>(HttpStatus.NOT_FOUND.value(), "FAILURE", "User not found with email: " + email, null);
        }

        String tempToken = UUID.randomUUID().toString();
        String token = generateResetToken(email, tempToken);

        try {
            emailService.sendPasswordResetEmail(email, token, returnUrl);
            return new ResponseWrapper<>(HttpStatus.OK.value(), "SUCCESS", "Email sent to " + user.getEmail(), null);
        } catch (MessagingException e) {
            return new ResponseWrapper<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "FAILURE", "Failed to send email", null);
        }
    }

    @PostMapping("/resetPassword")
    public ResponseWrapper<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        try {
            Jwt decodedToken = jwtDecoder.decode(token);
            String email = decodedToken.getSubject();
            String tempToken = decodedToken.getClaim("tempToken");

            logger.info("Decoded email: {}", email);
            logger.info("Decoded tempToken: {}", tempToken);

            UserDTO user = userService.getUserByEmail(email);
            logger.info("User: {}", user);

            if (user == null) {
                return new ResponseWrapper<>(HttpStatus.BAD_REQUEST.value(), "FAILURE", "Invalid token", null);
            }

            userService.updatePassword(email, newPassword);
            return new ResponseWrapper<>(HttpStatus.OK.value(), "SUCCESS", "Password updated successfully", null);
        } catch (JwtException e) {
            return new ResponseWrapper<>(HttpStatus.BAD_REQUEST.value(), "FAILURE", "Invalid token", null);
        }
    }
}
