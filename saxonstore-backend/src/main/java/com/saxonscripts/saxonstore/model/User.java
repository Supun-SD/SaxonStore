package com.saxonscripts.saxonstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String role;
    private String password;
    private String phone;
    private String address;
}
