package com.example.salesbackend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "sales_leads")
public class SalesLead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String salesName;
    private String eventLead;
    private String companyName;
    private String salesStage;
    private String opportunity;
    private String contactPersonName;
    private String designation;
    private String mobile;
    private String email;
    @Column(columnDefinition = "LONGTEXT")
    private String comments;
    private LocalDate nextFollowUpDate;
    private String quotationSent;
    private String sowSent;
    private String negotiation;
    @Column(precision = 15, scale = 2)
    private BigDecimal dealWon;
    private String domain;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSalesName() { return salesName; }
    public void setSalesName(String salesName) { this.salesName = salesName; }

    public String getEventLead() { return eventLead; }
    public void setEventLead(String eventLead) { this.eventLead = eventLead; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getSalesStage() { return salesStage; }
    public void setSalesStage(String salesStage) { this.salesStage = salesStage; }

    public String getOpportunity() { return opportunity; }
    public void setOpportunity(String opportunity) { this.opportunity = opportunity; }


    public String getContactPersonName() { return contactPersonName; }
    public void setContactPersonName(String contactPersonName) { this.contactPersonName = contactPersonName; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }


    public LocalDate getNextFollowUpDate() { return nextFollowUpDate; }
    public void setNextFollowUpDate(LocalDate nextFollowUpDate) { this.nextFollowUpDate = nextFollowUpDate; }

    public String getQuotationSent() { return quotationSent; }
    public void setQuotationSent(String quotationSent) { this.quotationSent = quotationSent; }

    public String getSowSent() {
        return sowSent;
    }

    public void setSowSent(String sowSent) {
        this.sowSent = sowSent;
    }

    public String getNegotiation() {
        return negotiation;
    }

    public void setNegotiation(String negotiation) {
        this.negotiation = negotiation;
    }

    public BigDecimal getDealWon() {
        return dealWon;
    }

    public void setDealWon(BigDecimal dealWon) {
        this.dealWon = dealWon;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }
}

