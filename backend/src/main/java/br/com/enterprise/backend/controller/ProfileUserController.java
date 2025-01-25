package br.com.enterprise.backend.controller;

import br.com.enterprise.backend.dto.ProfileUserDTO;
import br.com.enterprise.backend.service.ProfileUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/profile-user")
@CrossOrigin
public class ProfileUserController {

    @Autowired
    private ProfileUserService profileUserService;

    @GetMapping
    public List<ProfileUserDTO> listAll() {
        return profileUserService.listAll();
    }

    @PostMapping
    public void create(@RequestBody ProfileUserDTO profile) {
        profileUserService.create(profile);
    }

    @PutMapping
    public ProfileUserDTO update(@RequestBody ProfileUserDTO profile) {
        return profileUserService.update(profile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        profileUserService.delete(id);
        return ResponseEntity.ok().build();
    }
}
