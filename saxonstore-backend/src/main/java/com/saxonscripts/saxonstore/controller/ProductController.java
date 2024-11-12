package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.ProductDTO;
import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import com.saxonscripts.saxonstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Create a new product
    @PostMapping
    public ResponseWrapper<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO createdProduct = productService.createProduct(productDTO);
        return new ResponseWrapper<>(200, "SUCCESS", "Product created successfully", createdProduct);
    }

    // Get all products
    @GetMapping
    public ResponseWrapper<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> allProducts = productService.getAllProducts();
        return new ResponseWrapper<>(200, "SUCCESS", "All products", allProducts);
    }

    // Get product by ID
    @GetMapping("/{productId}")
    public ResponseWrapper<ProductDTO> getProductById(@PathVariable Long productId) {
        ProductDTO product = productService.getProductById(productId);
        return new ResponseWrapper<>(200, "SUCCESS", "Product details", product);
    }

    // Delete product by ID
    @DeleteMapping("/{productId}")
    public ResponseWrapper<Void> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new ResponseWrapper<>(200, "SUCCESS", "Product deleted successfully", null);
    }

    // Update product by ID
    @PutMapping("/{productId}")
    public ResponseWrapper<ProductDTO> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.updateProduct(productId, productDTO);
        return new ResponseWrapper<>(200, "SUCCESS", "Product updated successfully", updatedProduct);
    }

    // Get products by category and subcategory
    @GetMapping("/search")
    public ResponseWrapper<List<ProductDTO>> getProductsByCategory(
            @RequestParam("category") String category,
            @RequestParam("subcategory") String subcategory) {
        List<ProductDTO> products = productService.getProductsByCategoryAndSubcategory(category, subcategory);
        return new ResponseWrapper<>(200, "SUCCESS", "Products in category " + category + " and subcategory " + subcategory, products);
    }
}



