package com.saxonscripts.saxonstore.repo;

import com.saxonscripts.saxonstore.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    List<Order> findByCustomerId(String customerId);
}