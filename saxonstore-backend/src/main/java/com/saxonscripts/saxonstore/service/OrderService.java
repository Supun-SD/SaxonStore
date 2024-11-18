package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.*;
import com.saxonscripts.saxonstore.exception.ResourceNotFoundException;
import com.saxonscripts.saxonstore.model.*;
import com.saxonscripts.saxonstore.repo.OrderRepo;
import com.saxonscripts.saxonstore.repo.ProductVariantRepo;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductVariantRepo productVariantRepo;

    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = mapOrderDTOToEntity(orderDTO);

        Order savedOrder = orderRepo.save(order);

        for (OrderProductDTO orderProductDTO : orderDTO.getOrderProducts()) {
            ProductVariantDTO productVariantDTO = orderProductDTO.getProductVariant();

            ProductVariant productVariant = productVariantRepo.findById(productVariantDTO.getProductVariantId())
                    .orElseThrow(() -> new RuntimeException("ProductVariant not found"));

            int updatedQuantity = productVariant.getQuantity() - orderProductDTO.getQuantity();
            if (updatedQuantity < 0) {
                throw new RuntimeException(
                        "Not enough stock for productVariantId: " + productVariantDTO.getProductVariantId());
            }

            productVariant.setQuantity(updatedQuantity);

            productVariantRepo.save(productVariant);
        }

        return modelMapper.map(savedOrder, OrderDTO.class);
    }

    public List<SimpleOrderDTO> getAllOrders() {
        return orderRepo.findAll().stream()
                .map(this::convertToSimpleOrderDTO)
                .toList();
    }

    public List<SimpleOrderDTO> getOrdersByCustomerId(UUID customerId) {
        List<Order> orders = orderRepo.findByUserUserId(customerId);
        if (orders.isEmpty()) {
            throw new ResourceNotFoundException("No orders found for customer with ID: " + customerId);
        }
        return orders.stream()
                .map(this::convertToSimpleOrderDTO)
                .toList();
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long orderNo, String status) {
        Order order = orderRepo.findById(orderNo)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with order number: " + orderNo));
        order.setStatus(status);
        Order updatedOrder = orderRepo.save(order);
        OrderDTO orderDTO = modelMapper.map(updatedOrder, OrderDTO.class);
        orderDTO.setOrderProducts(null);
        orderDTO.setUser(null);
        return orderDTO;
    }

    private SimpleOrderDTO convertToSimpleOrderDTO(Order order) {
        SimpleOrderDTO simpleOrderDTO = modelMapper.map(order, SimpleOrderDTO.class);
        simpleOrderDTO.setOrderProducts(
                order.getOrderProducts().stream()
                        .map(this::convertToSimpleOrderProductDTO)
                        .toList());
        return simpleOrderDTO;
    }

    private SimpleOrderProductDTO convertToSimpleOrderProductDTO(OrderProduct orderProduct) {
        SimpleOrderProductDTO productDTO = new SimpleOrderProductDTO();
        productDTO.setProductName(orderProduct.getProduct().getName());
        productDTO.setPrice(orderProduct.getProduct().getPrice());
        productDTO.setColorName(orderProduct.getProductVariant().getColor().getName());
        productDTO.setSizeName(orderProduct.getProductVariant().getSize().getName());
        productDTO.setQuantity(orderProduct.getQuantity());

        orderProduct.getProduct().getProductImages().stream()
                .filter(ProductImage::getIsPrimary)
                .findFirst()
                .ifPresent(image -> productDTO.setPrimaryImageUrl(image.getImageUrl()));

        return productDTO;
    }

    private Order mapOrderDTOToEntity(OrderDTO orderDTO) {
        Order order = new Order();
        User user = new User();
        user.setUserId(orderDTO.getUser().getUserId());
        order.setUser(user);
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(orderDTO.getStatus());

        Delivery delivery = modelMapper.map(orderDTO.getDelivery(), Delivery.class);
        delivery.setOrder(order);
        order.setDelivery(delivery);

        List<OrderProduct> orderProducts = orderDTO.getOrderProducts().stream()
                .map(orderProductDTO -> mapOrderProductDTOToEntity(orderProductDTO, order))
                .toList();
        order.setOrderProducts(orderProducts);

        return order;
    }

    private OrderProduct mapOrderProductDTOToEntity(OrderProductDTO dto, Order order) {
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrder(order);
        orderProduct.setProductVariant(modelMapper.map(dto.getProductVariant(), ProductVariant.class));
        orderProduct.setProduct(modelMapper.map(dto.getProduct(), Product.class));
        orderProduct.setQuantity(dto.getQuantity());
        return orderProduct;
    }
}
