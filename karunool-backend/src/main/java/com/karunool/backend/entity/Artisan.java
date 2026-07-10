package com.karunool.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "artisans")
@Data
public class Artisan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "whatsapp_number")
    private String whatsappNumber;

    @Column(name = "qr_code_token", unique = true)
    private String qrCodeToken;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status")
    private VerificationStatus verificationStatus = VerificationStatus.DRAFT;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "district_id")
    private Long districtId;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "onboarded_by_id")
    private Long onboardedById;

    @OneToMany(mappedBy = "artisan", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private java.util.List<ArtisanTranslation> translations;
}
