package com.example.photoapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PictureDTO {
    private Long id;
    private String name;
    private String graphic;  // Base64 encoded image
}
