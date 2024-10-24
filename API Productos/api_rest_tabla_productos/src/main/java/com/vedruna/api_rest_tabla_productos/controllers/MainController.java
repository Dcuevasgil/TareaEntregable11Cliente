package com.vedruna.api_rest_tabla_productos.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "http://localhost:8080/")
public class MainController {
    
    @RequestMapping("/")
    public String saludo() {
        return "Hello World";
    }
}
