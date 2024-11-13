package com.saxonscripts.saxonstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int deliveryId;

    @OneToOne
    @JoinColumn(name = "orderNo", nullable = false)
    private Order order;

    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private int postalCode;
    private String note;
}
