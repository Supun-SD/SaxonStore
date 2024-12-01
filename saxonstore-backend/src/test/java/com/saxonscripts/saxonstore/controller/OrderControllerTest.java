package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.*;
import com.saxonscripts.saxonstore.service.OrderService;
import com.saxonscripts.saxonstore.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
class OrderControllerTest {

    @MockBean
    private OrderService orderService;

    @InjectMocks
    private OrderController orderController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // Defining reusable DTOs
    private ColorDTO createColorDTO() {
        return new ColorDTO(1, "Red", "#FF0000");
    }

    private SizeDTO createSizeDTO() {
        return new SizeDTO(1, "Large");
    }

    private ProductVariantDTO createProductVariantDTO() {
        return new ProductVariantDTO(
                1L,
                createColorDTO(),
                createSizeDTO(),
                10, // Quantity
                "SKU123456"
        );
    }

    private ProductImageDTO createProductImageDTO() {
        return new ProductImageDTO(
                1L,
                "image-url-1.jpg",
                true
        );
    }

    private ProductDTO createProductDTO() {
        return new ProductDTO(
                1L,
                "Gaming Laptop",
                "High-performance gaming laptop",
                BigDecimal.valueOf(1500.00),
                "Electronics",
                "Laptops",
                true,
                LocalDateTime.now(),
                LocalDateTime.now(),
                List.of(createProductVariantDTO()), // Product Variants
                List.of(createProductImageDTO())   // Product Images
        );
    }

    private OrderProductDTO createOrderProductDTO() {
        return new OrderProductDTO(
                createProductDTO(),
                createProductVariantDTO(),
                2 // Quantity of this product in the order
        );
    }

    private DeliveryDTO createDeliveryDTO() {
        return new DeliveryDTO(
                101L,
                "John",
                "Doe",
                "1234567890",
                "123 Main Street",
                "Cityville",
                54321,
                "Leave at the reception"
        );
    }

    private UserDTO createUserDTO() {
        return new UserDTO(
                UUID.randomUUID(),
                "Jane",
                "Doe",
                "jane_doe",
                "jane.doe@example.com",
                "securepassword",
                "9876543210",
                "456 Another Street",
                "Metropolis",
                67890,
                "CUSTOMER",
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    private OrderDTO createOrderDTO() {
        return new OrderDTO(
                1L,
                createUserDTO(),
                LocalDateTime.now(),
                BigDecimal.valueOf(3000.00), // Total amount
                "PENDING",
                List.of(createOrderProductDTO()), // List of products in the order
                createDeliveryDTO() // Delivery details
        );
    }

    private SimpleOrderProductDTO createSimpleOrderProductDTO() {
        return new SimpleOrderProductDTO(
                "Gaming Laptop",                // productName
                BigDecimal.valueOf(1500.00),    // price
                "Red",                          // colorName
                "Large",                        // sizeName
                2,                              // quantity
                "image-url-1.jpg"               // primaryImageUrl
        );
    }

    private SimpleOrderDTO createSimpleOrderDTO() {
        DeliveryDTO deliveryDTO = new DeliveryDTO(
                101L,                          // deliveryId
                "John",                        // firstName
                "Doe",                         // lastName
                "1234567890",                  // phone
                "123 Main Street",             // address
                "Cityville",                   // city
                54321,                         // postalCode
                "Leave at the reception"       // note
        );

        List<SimpleOrderProductDTO> orderProducts = List.of(createSimpleOrderProductDTO());

        return new SimpleOrderDTO(
                1L,                            // orderId
                LocalDateTime.now(),           // orderDate
                BigDecimal.valueOf(3000.00),   // totalAmount
                "PENDING",                     // status
                orderProducts,                 // orderProducts
                deliveryDTO                    // delivery
        );
    }

    @Test
    void testCreateOrder() {
        // Arrange
        OrderDTO orderDTO = createOrderDTO();
        when(orderService.createOrder(any(OrderDTO.class))).thenReturn(orderDTO);

        // Act
        ResponseWrapper<OrderDTO> response = orderController.createOrder(orderDTO);

        // Assert
        assertEquals(200, response.getHttpCode());
        assertEquals("SUCCESS", response.getStatus());
        assertEquals("Order created successfully", response.getMessage());
        assertEquals(orderDTO, response.getData());
        verify(orderService, times(1)).createOrder(any(OrderDTO.class));
    }

    @Test
    void testGetAllOrders() {
        // Arrange
        SimpleOrderDTO simpleOrderDTO = createSimpleOrderDTO();
        List<SimpleOrderDTO> orders = List.of(simpleOrderDTO);
        when(orderService.getAllOrders()).thenReturn(orders);

        // Act
        ResponseWrapper<List<SimpleOrderDTO>> response = orderController.getAllOrders();

        // Assert
        assertEquals(200, response.getHttpCode());
        assertEquals("SUCCESS", response.getStatus());
        assertEquals("All Orders", response.getMessage());
        assertEquals(orders, response.getData());
        verify(orderService, times(1)).getAllOrders();
    }

    @Test
    void testGetOrdersByCustomerId() {
        // Arrange
        UUID customerId = UUID.randomUUID();
        SimpleOrderDTO simpleOrderDTO = createSimpleOrderDTO();
        List<SimpleOrderDTO> customerOrders = List.of(simpleOrderDTO);
        when(orderService.getOrdersByCustomerId(customerId)).thenReturn(customerOrders);

        // Act
        ResponseWrapper<List<SimpleOrderDTO>> response = orderController.getOrdersByCustomerId(customerId);

        // Assert
        assertEquals(200, response.getHttpCode());
        assertEquals("SUCCESS", response.getStatus());
        assertEquals("All Orders for customer " + customerId, response.getMessage());
        assertEquals(customerOrders, response.getData());
        verify(orderService, times(1)).getOrdersByCustomerId(customerId);
    }
    @Test
    void testUpdateOrder() {
        // Arrange
        Long orderNo = 1L;
        OrderStatusDTO statusUpdate = new OrderStatusDTO("SHIPPED");
        OrderDTO updatedOrder = createOrderDTO();
        updatedOrder.setStatus("SHIPPED");
        when(orderService.updateOrderStatus(orderNo, statusUpdate.getStatus())).thenReturn(updatedOrder);

        // Act
        ResponseWrapper<OrderDTO> response = orderController.updateOrder(orderNo, statusUpdate);

        // Assert
        assertEquals(200, response.getHttpCode());
        assertEquals("SUCCESS", response.getStatus());
        assertEquals("Order status updated to SHIPPED", response.getMessage());
        assertEquals(updatedOrder, response.getData());
        verify(orderService, times(1)).updateOrderStatus(orderNo, statusUpdate.getStatus());
    }



}
