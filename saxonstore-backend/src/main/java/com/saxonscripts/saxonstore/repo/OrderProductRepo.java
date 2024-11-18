package com.saxonscripts.saxonstore.repo;

import com.saxonscripts.saxonstore.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductRepo extends JpaRepository<OrderProduct, Integer> {
}