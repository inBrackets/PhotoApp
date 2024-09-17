package com.example.photoapp.controller;

import com.example.photoapp.dto.PictureDTO;
import com.example.photoapp.model.Picture;
import com.example.photoapp.repository.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/pictures")
public class PictureController {

    private final PictureRepository pictureRepository;

    @GetMapping
    public List<PictureDTO> getAllPictures() {
        return pictureRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/upload")
    public PictureDTO uploadPicture(@RequestParam("name") String name,
                                    @RequestParam("picture") MultipartFile picture) throws IOException {
        Picture newPicture = new Picture();
        newPicture.setName(name);
        newPicture.setGraphic(picture.getBytes());
        Picture savedPicture = pictureRepository.save(newPicture);
        return convertToDTO(savedPicture);
    }

    private PictureDTO convertToDTO(Picture picture) {
        return new PictureDTO(
                picture.getId(),
                picture.getName(),
                Base64.getEncoder().encodeToString(picture.getGraphic())
        );
    }
}
