package com.vedruna.api_rest_tabla_productos.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedruna.api_rest_tabla_productos.persistance.models.Product;
import com.vedruna.api_rest_tabla_productos.services.ProductServiceI;


@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
	
	@Autowired
	private ProductServiceI productServiceI;
	
	
	@GetMapping("/lista")
    public List<Product> getAllProducts() {
        return productServiceI.findAll();
    }
	
	
	@GetMapping("/name/{productname}")
    public Product showProductByUsername(@PathVariable String productname) {
        return productServiceI.findByProductName(productname);
    }
	
	
	@PostMapping("/create_product")
    public Product postProduct(@RequestBody Product product) {
		return productServiceI.save(product);
	}
	
	
	@PutMapping("/edit/{id}")
	public String update(@PathVariable Long id, @RequestBody Product producto) {
	    try {
	        Optional<Product> productoOptional = productServiceI.findById(id);
	        
	        if (productoOptional.isPresent()) {
	        	
	            Product productoDB = productoOptional.get();
	            productoDB.setProductName(producto.getProductName());
	            productoDB.setProductPrice(producto.getProductPrice());
	            
	            productServiceI.save(productoDB);
	            
	            return "Producto actualizado!";
	        } else {
	            return "Producto no encontrado.";
	        }
	    } catch (Exception e) {
	        return "Error al actualizar el producto: " + e.getMessage();
	    }
	}
	
	
	@DeleteMapping("delete/{id}")	
	public String delete(@PathVariable Long id) {
	    try {
	        Optional<Product> productoOptional = productServiceI.findById(id);
	        
	        if (productoOptional.isPresent()) {
	            productServiceI.deleteById(id);
	            return "Producto eliminado exitosamente.";
	        } else {
	            return "Producto no encontrado.";
	        }
	    } catch (Exception e) {
	        return "Error al eliminar el producto: " + e.getMessage();
	    }
	}
}