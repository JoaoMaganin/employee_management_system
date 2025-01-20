package br.com.enterprise.backend.controller;

import br.com.enterprise.backend.dto.ResourceDTO;
import br.com.enterprise.backend.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/resource")
@CrossOrigin
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @GetMapping
    public List<ResourceDTO> listAll() {
        return resourceService.listAll();
    }

    @PostMapping
    public void create(@RequestBody ResourceDTO resource) {
        resourceService.create(resource);
    }

    @PutMapping
    public ResourceDTO update(@RequestBody ResourceDTO resource) {
        return resourceService.update(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        resourceService.delete(id);
        return ResponseEntity.ok().build();
    }
}
