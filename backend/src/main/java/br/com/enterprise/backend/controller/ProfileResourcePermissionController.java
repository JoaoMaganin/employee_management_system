package br.com.enterprise.backend.controller;

import br.com.enterprise.backend.dto.ProfileResourcePermissionDTO;
import br.com.enterprise.backend.service.ProfileResourcePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/profile-resource")
@CrossOrigin
public class ProfileResourcePermissionController {

    @Autowired
    private ProfileResourcePermissionService profileResourcePermissionService;

    @GetMapping
    public List<ProfileResourcePermissionDTO> listAll() {
        return profileResourcePermissionService.listAll();
    }

    @PostMapping
    public void create(@RequestBody ProfileResourcePermissionDTO profile) {
        profileResourcePermissionService.create(profile);
    }

    @PutMapping
    public ProfileResourcePermissionDTO update(@RequestBody ProfileResourcePermissionDTO profile) {
        return profileResourcePermissionService.update(profile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        profileResourcePermissionService.delete(id);
        return ResponseEntity.ok().build();
    }
}
