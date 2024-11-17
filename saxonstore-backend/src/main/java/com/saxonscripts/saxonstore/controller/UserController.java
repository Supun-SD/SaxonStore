package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.UserDTO;
import com.saxonscripts.saxonstore.dto.LoginRequestDTO;
import com.saxonscripts.saxonstore.dto.LoginResponseDTO;
import com.saxonscripts.saxonstore.service.UserService;
import com.saxonscripts.saxonstore.util.EmailService;

import jakarta.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin
@RequestMapping("/users")
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
                .claim("address", user.getAddress())
                .claim("city", user.getCity())
                .claim("postalCode", user.getPostalCode())
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
    public List<UserDTO> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUsers(@RequestBody UserDTO userDTO) {
        try {
            UserDTO createdUser = userService.createUser(userDTO);
            return ResponseEntity.ok(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO user = userService.login(loginRequestDTO);
        if (user != null) {
            // Generate JWT token with user details
            String token = generateToken(user);
            // Return token in the response
            return ResponseEntity.ok().body(token);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String returnUrl = request.get("returnUrl");
        UserDTO user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found with email: " + email);
        }
        // Generate reset token and save it
        String tempToken = UUID.randomUUID().toString();
        String token = generateResetToken(email, tempToken);

        // Send email with reset link
        try {
            emailService.sendPasswordResetEmail(email, token, returnUrl);
            return ResponseEntity.ok("Email sent to " + user.getEmail());
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send email");
        }
    }
    
    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        try {
            Jwt decodedToken = jwtDecoder.decode(token);
            String email = decodedToken.getSubject();
            String tempToken = decodedToken.getClaim("tempToken");

            // Log the values of email and tempToken
            logger.info("Decoded email: {}", email);
            logger.info("Decoded tempToken: {}", tempToken);

            // Verify the email and tempToken
            UserDTO user = userService.getUserByEmail(email);
            logger.info("User: {}", user);
            if (user == null) {
                return ResponseEntity.status(400).body("Invalid token");
            }
            // if(user == null || !user.getUserId().equals(tempToken)) {
            //     return ResponseEntity.status(400).body("Invalid token");
            // }
            // Update the user's password
            userService.updatePassword(email, newPassword);
            return ResponseEntity.ok("Password updated successfully");
        } catch (JwtException e) {
            return ResponseEntity.status(400).body("Invalid token");
        }
    }
}
