package com.saxonscripts.saxonstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orderProduct")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderProductId;

    @ManyToOne
    @JoinColumn(name = "orderId", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "productVariantId", nullable = false)
    private ProductVariant productVariant;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    private Integer quantity;
}
