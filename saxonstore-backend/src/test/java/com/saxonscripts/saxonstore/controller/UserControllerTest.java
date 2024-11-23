package com.saxonscripts.saxonstore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import com.saxonscripts.saxonstore.dto.UserDTO;
import com.saxonscripts.saxonstore.dto.LoginRequestDTO;
import com.saxonscripts.saxonstore.dto.LoginResponseDTO;
import com.saxonscripts.saxonstore.service.UserService;
import com.saxonscripts.saxonstore.util.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// Test class for UserController


@SpringBootTest
public class UserControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtEncoder encoder;

    @MockBean
    private JwtDecoder jwtDecoder;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void testLogin() throws Exception {
        // Define the mock behavior for userService
        LoginRequestDTO loginRequest = new LoginRequestDTO("wijesekarathinuri@gmail.com", "abcd@1234", "user");
        LoginResponseDTO loginResponse = new LoginResponseDTO(
                UUID.randomUUID(),
                "Thiruni",
                "Wijesekara",
                "wijesekarathinuri",
                "wijesekarathinuri@gmail.com",
                "9876543210",
                "Metropolis",
                "Colombo",
                67890,
                "CUSTOMER"
        );

        when(userService.login(Mockito.any(LoginRequestDTO.class))).thenReturn(loginResponse);

        // Mock the JwtEncoder
        when(encoder.encode(any(JwtEncoderParameters.class)))
                .thenReturn(new Jwt("mockedToken", Instant.now(), Instant.now().plusSeconds(3600),
                        Map.of("alg", "HS256"), Map.of("sub", "mockedUser")));

        // Perform the login test using MockMvc
        mockMvc.perform(post("/api/v1/login")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpCode").value(500))
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("Login successful"))
                .andExpect(jsonPath("$.data").value("mockedToken"));
    }
}