package com.saxonscripts.saxonstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "delivery")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

    @OneToOne
    @JoinColumn(name = "orderId", nullable = false)
    private Order order;

    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String city;
    private Integer postalCode;
    private String note;
}
