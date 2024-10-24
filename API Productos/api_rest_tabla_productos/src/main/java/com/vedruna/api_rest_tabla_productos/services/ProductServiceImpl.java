package com.vedruna.api_rest_tabla_productos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vedruna.api_rest_tabla_productos.persistance.models.Product;
import com.vedruna.api_rest_tabla_productos.persistance.repository.ProductRepositoryI;

@Service
public class ProductServiceImpl implements ProductServiceI {
	
	@Autowired
	private ProductRepositoryI productRepository;

	@Override
	public Product findByProductName(String productName) {
		return productRepository.findByProductName(productName);
	}

	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public Product save(Product product) {
		return productRepository.save(product);
	}

	@Override
	public Optional<Product> findById(Long id) {
		return productRepository.findById(id);
	}

	@Override
	public void deleteById(Long id) {
		productRepository.deleteById(id);	
	}

}