package com.saxonscripts.saxonstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleOrderProductDTO {
    private String productName;
    private BigDecimal price;
    private String colorName;
    private String sizeName;
    private Integer quantity;
    private String primaryImageUrl;
}
