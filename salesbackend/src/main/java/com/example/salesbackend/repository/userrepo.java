package com.example.salesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.salesbackend.model.user;
import java.util.Optional;

public interface userrepo extends JpaRepository<user, Long> {
    Optional<user> findByEmail(String email);
}
