package com.saxonscripts.saxonstore.repo;

import com.saxonscripts.saxonstore.model.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariantRepo extends JpaRepository<ProductVariant, Long> {
}

