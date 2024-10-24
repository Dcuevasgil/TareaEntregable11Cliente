package com.vedruna.api_rest_tabla_productos.persistance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vedruna.api_rest_tabla_productos.persistance.models.Product;


@Repository
public interface ProductRepositoryI extends JpaRepository<Product, Long> {
	
	List<Product> findAll();
	Product save(Product product);
	Product findByProductName(String productName);
	

}
