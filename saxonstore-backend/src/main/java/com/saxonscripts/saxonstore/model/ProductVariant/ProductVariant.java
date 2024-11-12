package com.saxonscripts.saxonstore.model.ProductVariant;

import com.saxonscripts.saxonstore.model.Color.Color;
import com.saxonscripts.saxonstore.model.Product.Product;
import com.saxonscripts.saxonstore.model.Size.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "product_variants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "color_id", nullable = false)
    private Color color;

    @ManyToOne
    @JoinColumn(name = "size_id", nullable = false)
    private Size size;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "sku", unique = true)
    private String sku;
}

