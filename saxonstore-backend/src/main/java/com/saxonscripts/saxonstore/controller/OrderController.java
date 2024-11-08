package com.saxonscripts.saxonstore.controller;

import com.saxonscripts.saxonstore.dto.OrderDTO;
import com.saxonscripts.saxonstore.dto.OrderStatusDTO;
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
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.createOrder(orderDTO);
    }

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/customer/{customerId}")
    public List<OrderDTO> getOrdersByCustomerId(@PathVariable String customerId) {
        return orderService.getOrdersByCustomerId(customerId);
    }

    @PutMapping("/{orderNo}")
    public OrderDTO updateOrder(@PathVariable int orderNo, @RequestBody OrderStatusDTO statusUpdate) {
        return orderService.updateOrderStatus(orderNo, statusUpdate.getStatus());
    }
}
