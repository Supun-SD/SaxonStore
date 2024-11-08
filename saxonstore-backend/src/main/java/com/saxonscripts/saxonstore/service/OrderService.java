package com.saxonscripts.saxonstore.service;

import com.saxonscripts.saxonstore.dto.OrderDTO;
import com.saxonscripts.saxonstore.model.Order;
import com.saxonscripts.saxonstore.model.OrderProduct;
import com.saxonscripts.saxonstore.repo.OrderRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setCustomerId(orderDTO.getCustomerId());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(orderDTO.getStatus());

        List<OrderProduct> orderProducts = orderDTO.getOrderProducts().stream().map(orderProductDTO -> {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(order);
            orderProduct.setProductVariantId(orderProductDTO.getProductVariantId());
            orderProduct.setQuantity(orderProductDTO.getQuantity());
            return orderProduct;
        }).toList();

        order.setOrderProducts(orderProducts);
        Order savedOrder = orderRepo.save(order);
        return modelMapper.map(savedOrder, OrderDTO.class);
    }


    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepo.findAll();
        return modelMapper.map(orders, new TypeToken<List<OrderDTO>>(){}.getType());
    }

    public List<OrderDTO> getOrdersByCustomerId(String customerId) {
        List<Order> orders = orderRepo.findByCustomerId(customerId);
        return modelMapper.map(orders, new TypeToken<List<OrderDTO>>(){}.getType());
    }

    @Transactional
    public OrderDTO updateOrderStatus(int orderNo, String status) {
        Order order = orderRepo.findById(orderNo)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        Order updatedOrder = orderRepo.save(order);
        return modelMapper.map(updatedOrder, OrderDTO.class);
    }
}
