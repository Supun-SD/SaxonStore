package com.saxonscripts.saxonstore.repo;

import com.saxonscripts.saxonstore.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepo extends JpaRepository<ProductImage, Long> {
}

