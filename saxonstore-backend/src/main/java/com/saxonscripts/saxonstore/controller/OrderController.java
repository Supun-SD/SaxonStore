package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.OrderDTO;
import com.saxonscripts.saxonstore.dto.OrderStatusDTO;
import com.saxonscripts.saxonstore.dto.ResponseWrapper;
import com.saxonscripts.saxonstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseWrapper<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        OrderDTO createdOrder = orderService.createOrder(orderDTO);
        return new ResponseWrapper<>(200, "SUCCESS", "Order created successfully", createdOrder);
    }

    @GetMapping
    public ResponseWrapper<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> allOrders = orderService.getAllOrders();
        return new ResponseWrapper<>(200, "SUCCESS", "All Orders", allOrders);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseWrapper<List<OrderDTO>> getOrdersByCustomerId(@PathVariable String customerId) {
        List<OrderDTO> allCustomerOrders = orderService.getOrdersByCustomerId(customerId);
        return new ResponseWrapper<>(200, "SUCCESS", "All Orders for customer " + customerId, allCustomerOrders);
    }

    @PutMapping("/{orderNo}")
    public ResponseWrapper<OrderDTO> updateOrder(@PathVariable int orderNo, @RequestBody OrderStatusDTO statusUpdate) {
        OrderDTO updatedOrder = orderService.updateOrderStatus(orderNo, statusUpdate.getStatus());
        return new ResponseWrapper<>(200, "SUCCESS", "Order status updated to " + statusUpdate.getStatus(), updatedOrder);
    }
}
