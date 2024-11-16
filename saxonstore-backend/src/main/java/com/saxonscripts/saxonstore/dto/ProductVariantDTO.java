package com.saxonscripts.saxonstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDTO {
    private Long productVariantId;
    private ColorDTO color;
    private SizeDTO size;
    private Integer quantity;
    private String sku;
}

