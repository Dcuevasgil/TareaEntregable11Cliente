package com.vedruna.api_rest_tabla_productos.services;

import java.util.List;
import java.util.Optional;

import com.vedruna.api_rest_tabla_productos.persistance.models.Product;

public interface ProductServiceI {
	
	List<Product> findAll();
	Product save(Product product);
	Product findByProductName(String productName);
	Optional<Product> findById(Long id);
	void deleteById(Long id);
	
}