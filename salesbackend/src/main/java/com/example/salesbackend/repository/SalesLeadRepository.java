package com.example.salesbackend.repository;

import com.example.salesbackend.model.SalesLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesLeadRepository extends JpaRepository<SalesLead, Long> {
}
