package com.saxonscripts.saxonstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "productVariant")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productVariantId;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "colorId", nullable = false)
    private Color color;

    @ManyToOne
    @JoinColumn(name = "sizeId", nullable = false)
    private Size size;

    @Column(nullable = false)
    private Integer quantity;

    @Column(unique = true, nullable = true)
    private String sku = null;
}

