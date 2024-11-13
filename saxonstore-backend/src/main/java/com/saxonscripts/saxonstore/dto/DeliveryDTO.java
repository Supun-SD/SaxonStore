package com.saxonscripts.saxonstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDTO {
    private int deliveryId;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private int postalCode;
    private String note;
}
