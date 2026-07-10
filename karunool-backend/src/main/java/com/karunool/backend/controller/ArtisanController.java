package com.karunool.backend.controller;

import com.karunool.backend.entity.Artisan;
import com.karunool.backend.entity.ArtisanTranslation;
import com.karunool.backend.entity.VerificationStatus;
import com.karunool.backend.repository.ArtisanRepository;
import com.karunool.backend.dto.ArtisanRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/artisans")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtisanController {

    @Autowired
    private ArtisanRepository artisanRepository;

    @GetMapping
    public List<Artisan> getAllArtisans() {
        return artisanRepository.findAll();
    }

    @GetMapping("/{id}")
    public Artisan getArtisanById(@PathVariable Long id) {
        return artisanRepository.findById(id).orElseThrow(() -> new RuntimeException("Artisan not found"));
    }

    @PostMapping
    public Artisan createArtisan(@RequestBody ArtisanRequestDTO dto) {
        // 1. Create the base Artisan
        Artisan artisan = new Artisan();
        artisan.setContactNumber(dto.getContactNumber());
        artisan.setDistrictId(dto.getDistrictId());
        artisan.setCategoryId(dto.getCategoryId());
        artisan.setOnboardedById(dto.getOnboardedById());
        
        // Auto-verify for the sake of our demo
        artisan.setIsVerified(true);
        artisan.setVerificationStatus(VerificationStatus.LIVE);
        artisan.setQrCodeToken("QR_" + UUID.randomUUID().toString().substring(0, 8));
        
        // 2. Create the Translation (Name and Story)
        ArtisanTranslation translation = new ArtisanTranslation();
        translation.setLanguageCode("en");
        translation.setName(dto.getName());
        translation.setBio(dto.getBio());
        translation.setCraftStory(dto.getCraftStory());
        
        // 3. Link them together
        translation.setArtisan(artisan);
        artisan.setTranslations(new ArrayList<>(List.of(translation)));
        
        // 4. Save to Database (Cascade rule saves both automatically)
        return artisanRepository.save(artisan);
    }
}
