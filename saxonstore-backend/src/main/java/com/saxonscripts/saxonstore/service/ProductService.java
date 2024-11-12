package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.ProductDTO;
import com.saxonscripts.saxonstore.exception.ResourceNotFoundException;
import com.saxonscripts.saxonstore.model.Product;
import com.saxonscripts.saxonstore.model.ProductVariant;
import com.saxonscripts.saxonstore.repo.ProductRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ModelMapper modelMapper;

    // Create a new product
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);

        // Set up product variants if any
        List<ProductVariant> productVariants = productDTO.getProductVariants().stream().map(variantDTO -> {
            ProductVariant variant = modelMapper.map(variantDTO, ProductVariant.class);
            variant.setProduct(product);
            return variant;
        }).toList();

        product.setProductVariants(productVariants);

        // Save the product to the repository
        Product savedProduct = productRepo.save(product);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    // Get all products
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepo.findAll();
        return modelMapper.map(products, new TypeToken<List<ProductDTO>>(){}.getType());
    }

    // Get product by ID
    public ProductDTO getProductById(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        return modelMapper.map(product, ProductDTO.class);
    }

    // Delete product by ID
    @Transactional
    public void deleteProduct(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        productRepo.delete(product);
    }

    // Update product by ID
    @Transactional
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));

        // Update product details
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setSubcategory(productDTO.getSubcategory());

        // Update product variants if any
        List<ProductVariant> productVariants = productDTO.getProductVariants().stream().map(variantDTO -> {
            ProductVariant variant = modelMapper.map(variantDTO, ProductVariant.class);
            variant.setProduct(product);
            return variant;
        }).toList();

        product.setProductVariants(productVariants);

        // Save updated product
        Product updatedProduct = productRepo.save(product);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

    // Get products by category and subcategory
    public List<ProductDTO> getProductsByCategoryAndSubcategory(String category, String subcategory) {
        List<Product> products = productRepo.findByCategoryAndSubcategory(category, subcategory);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for category: " + category + " and subcategory: " + subcategory);
        }
        return modelMapper.map(products, new TypeToken<List<ProductDTO>>(){}.getType());
    }
}
