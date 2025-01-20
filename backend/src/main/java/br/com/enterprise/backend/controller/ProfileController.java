package br.com.enterprise.backend.controller;

import br.com.enterprise.backend.dto.ProfileDTO;
import br.com.enterprise.backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
@CrossOrigin
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public List<ProfileDTO> listAll() {
        return profileService.listAll();
    }

    @PostMapping
    public void create(@RequestBody ProfileDTO profile) {
        profileService.create(profile);
    }

    @PutMapping
    public ProfileDTO update(@RequestBody ProfileDTO profile) {
        return profileService.update(profile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        profileService.delete(id);
        return ResponseEntity.ok().build();
    }
}
