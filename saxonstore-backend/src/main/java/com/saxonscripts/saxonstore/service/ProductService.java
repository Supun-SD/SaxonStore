package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.ProductDTO;
import com.saxonscripts.saxonstore.dto.ProductVariantDTO;
import com.saxonscripts.saxonstore.exception.ResourceNotFoundException;
import com.saxonscripts.saxonstore.model.*;
import com.saxonscripts.saxonstore.repo.*;
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
    private ProductVariantRepo productVariantRepo;

    @Autowired
    private ModelMapper modelMapper;

    //Create a new product
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        for (int i = 0; i < product.getProductVariants().size(); i++) {
            product.getProductVariants().get(i).setProduct(product);
        }
        if(product.getProductImages() != null){
            for (int i = 0; i < product.getProductImages().size(); i++) {
                product.getProductImages().get(i).setProduct(product);
            }
        }
        Product createdProduct = productRepo.save(product);

        return modelMapper.map(createdProduct, ProductDTO.class);
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

        if(productDTO.getPrice() != null){
            product.setPrice(productDTO.getPrice());
        }

        if(productDTO.getIsListed() != null){
            product.setIsListed(productDTO.getIsListed());
        }

        if(productDTO.getProductVariants() != null){
            for (ProductVariantDTO variantDTO : productDTO.getProductVariants()) {
                ProductVariant variant = productVariantRepo.findById(variantDTO.getProductVariantId())
                        .orElseThrow(() -> new ResourceNotFoundException("Variant not found for id: " + variantDTO.getProductVariantId()));

                // Update variant details (e.g., quantity)
                variant.setQuantity(variantDTO.getQuantity());

                // Save the updated variant
                productVariantRepo.save(variant);
            }
        }

        // Save updated product
        Product updatedProduct = productRepo.save(product);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

    //Get products by category and subcategory
    public List<ProductDTO> getProductsByCategory(String category, String subcategory) {
        List<Product> products = productRepo.findByCategoryAndSubcategoryAndIsListedTrue(category, subcategory);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for category: " + category + " and subcategory: " + subcategory);
        }
        return modelMapper.map(products, new TypeToken<List<ProductDTO>>(){}.getType());
    }

    public  List<ProductDTO> getProductsByName(String name){
        List<Product> products = productRepo.findByNameContainingIgnoreCase(name);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found with name: " + name);
        }
        return modelMapper.map(products, new TypeToken<List<ProductDTO>>(){}.getType());
    }
}
