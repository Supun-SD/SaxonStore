package com.saxonscripts.saxonstore.repo;

import com.saxonscripts.saxonstore.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    // Custom query to find products by category and subcategory
    List<Product> findByCategoryAndSubcategoryAndIsListedTrue(String category, String subcategory);

    List<Product> findByNameContainingIgnoreCase(String name);
}

