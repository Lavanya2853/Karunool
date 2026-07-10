package com.karunool.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "artisan_translations")
@Data
public class ArtisanTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "language_code", nullable = false)
    private String languageCode;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "craft_story", columnDefinition = "TEXT")
    private String craftStory;

    @ManyToOne
    @JoinColumn(name = "artisan_id", nullable = false)
    @JsonIgnore // This stops the API from looping infinitely
    @ToString.Exclude
    private Artisan artisan;
}
