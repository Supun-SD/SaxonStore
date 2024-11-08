package com.saxonscripts.saxonstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private int orderNo;
    private String customerId;
    private LocalDateTime orderDate;
    private double totalAmount;
    private String status;
    private List<OrderProductDTO> orderProducts;
}
