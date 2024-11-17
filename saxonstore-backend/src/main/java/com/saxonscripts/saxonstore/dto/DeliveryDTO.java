package com.saxonscripts.saxonstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDTO {
    private Long deliveryId;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String city;
    private Integer postalCode;
    private String note;
}
