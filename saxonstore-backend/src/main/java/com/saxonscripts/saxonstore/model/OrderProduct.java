package com.saxonscripts.saxonstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_products")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "orderNo", nullable = false)
    private Order order;

//    @ManyToOne
//    @JoinColumn(name = "product_variant_id", nullable = false)
//    private ProductVariant productVariant;
    private String productVariantId;

    private int quantity;
}
