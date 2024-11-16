package com.saxonscripts.saxonstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private UUID userId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String address;
    private String city;
    private Integer postalCode;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
