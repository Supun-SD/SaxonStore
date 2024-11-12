package com.saxonscripts.saxonstore.repo;

import com.saxonscripts.saxonstore.model.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepo extends JpaRepository<ProductVariant, Long> {
    // You can add custom queries related to product variants if needed
    // Example: find variants by product ID
    List<ProductVariant> findByProductId(Long productId);
}

