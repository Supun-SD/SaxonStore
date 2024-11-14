package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.UserDTO;
import com.saxonscripts.saxonstore.dto.LoginRequestDTO;
import com.saxonscripts.saxonstore.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin
@RequestMapping("users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtEncoder encoder;

    private String generateToken(String email, String role) {
        Instant now = Instant.now();
        long expiry = 36000L;
        // @formatter:off
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer("self")
				.issuedAt(now)
				.expiresAt(now.plusSeconds(expiry))
				.subject(email)
                .claim("role", role)
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
        boolean isAuthenticated = userService.login(loginRequestDTO);
        if (isAuthenticated) {
            // Generate JWT token
            String token = generateToken(loginRequestDTO.getEmail(), loginRequestDTO.getRole());
            // Return token in the response
            return ResponseEntity.ok().body(token);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/forgotPassword")
    public String ForgotPassword(@RequestBody String email) {
        //TODO: process POST request
        
        return "Email sent to " + email;
    }
    
    @PostMapping("/resetPassword")
    public String ResetPassword(@RequestBody String email) {

        return "Password reset for " + email;
    }

}
