package com.saxonscripts.saxonstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleOrderDTO {
    private Long orderId;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;
    private List<SimpleOrderProductDTO> orderProducts;
    private DeliveryDTO delivery;
}