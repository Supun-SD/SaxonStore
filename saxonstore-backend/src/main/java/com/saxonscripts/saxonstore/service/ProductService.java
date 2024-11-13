package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.ProductDTO;
import com.saxonscripts.saxonstore.dto.ProductVariantDTO;
import com.saxonscripts.saxonstore.exception.ResourceNotFoundException;
import com.saxonscripts.saxonstore.model.*;
import com.saxonscripts.saxonstore.repo.ColorRepo;
import com.saxonscripts.saxonstore.repo.ProductRepo;
import com.saxonscripts.saxonstore.repo.ProductVariantRepo;
import com.saxonscripts.saxonstore.repo.SizeRepo;
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
    private ColorRepo colorRepo;

    @Autowired
    private SizeRepo sizeRepo;

    @Autowired
    private ProductVariantRepo productVariantRepo;

    @Autowired
    private ModelMapper modelMapper;

    //Create a new product
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);

        if (product.getVariants() != null) {
            for (ProductVariant variant : product.getVariants()) {
                Size size = sizeRepo.findById(variant.getSize().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Size not found"));
                Color color = colorRepo.findById(variant.getColor().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Color not found"));

                variant.setSize(size);
                variant.setColor(color);
                variant.setProduct(product);
            }
        }

        if (product.getImages() != null) {
            for (ProductImage image : product.getImages()) {
                Color color = colorRepo.findById(image.getColor().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Color not found"));

                image.setColor(color);
                image.setProduct(product);
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

        if(productDTO.getVariants() != null){
            for (ProductVariantDTO variantDTO : productDTO.getVariants()) {
                ProductVariant variant = productVariantRepo.findById(variantDTO.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Variant not found for id: " + variantDTO.getId()));

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
        List<Product> products = productRepo.findByCategoryAndSubcategory(category, subcategory);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for category: " + category + " and subcategory: " + subcategory);
        }
        return modelMapper.map(products, new TypeToken<List<ProductDTO>>(){}.getType());
    }
}
