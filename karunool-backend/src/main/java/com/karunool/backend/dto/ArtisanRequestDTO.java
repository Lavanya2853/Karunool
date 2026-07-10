package com.karunool.backend.dto;

import lombok.Data;

@Data
public class ArtisanRequestDTO {
    // Basic Artisan Data
    private String contactNumber;
    private Long districtId;
    private Long categoryId;
    private Long onboardedById;
    
    // Translation Data (English)
    private String name;
    private String bio;
    private String craftStory;
}
