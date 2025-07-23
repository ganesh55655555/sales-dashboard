package com.example.salesbackend.controller;

import com.example.salesbackend.model.SalesLead;
import com.example.salesbackend.model.user;
import com.example.salesbackend.repository.SalesLeadRepository;
import com.example.salesbackend.service.userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = "*")
public class SalesLeadController {

    @Autowired
    private SalesLeadRepository repository;

    @Autowired
    private userservice userService;

    @GetMapping("/show")
    public List<SalesLead> getAllSales() {
        return repository.findAll();
    }

    @PostMapping("/save")
    public SalesLead createSalesLead(@RequestBody SalesLead salesLead) {
        return repository.save(salesLead);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalesLead> updateSalesLead(@PathVariable Long id, @RequestBody SalesLead updated) {
        return repository.findById(id)
                .map(existing -> {
                    updated.setId(id);
                    return ResponseEntity.ok(repository.save(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalesLead(@PathVariable Long id) {
        return repository.findById(id)
                .map(existing -> {
                    repository.deleteById(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody user user) {
        Map<String, String> response = new HashMap<>();
        if (user == null) {
            response.put("error", "Request body cannot be null");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (userService.findByEmail(user.getEmail()) != null) {
            response.put("error", "Email already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        userService.registerUser(user);
        response.put("message", "User registered successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody user user) {
        Map<String, String> response = new HashMap<>();
        if (user == null) {
            response.put("error", "Request body cannot be null");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        user foundUser = userService.findByEmail(user.getEmail());
        if (foundUser == null) {
            response.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (!user.getPassword().equals(foundUser.getPassword())) {
            response.put("error", "Invalid password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.put("message", "Login successful");
        response.put("email", foundUser.getEmail());
        response.put("password", foundUser.getPassword());
        response.put("name", foundUser.getName());
        return ResponseEntity.ok(response);
    }
}
