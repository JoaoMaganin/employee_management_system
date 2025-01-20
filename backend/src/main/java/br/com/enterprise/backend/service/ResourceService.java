package br.com.enterprise.backend.service;

import br.com.enterprise.backend.dto.ResourceDTO;
import br.com.enterprise.backend.entity.ResourceEntity;
import br.com.enterprise.backend.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public List<ResourceDTO> listAll() {
        List<ResourceEntity> resources = resourceRepository.findAll();
        return resources.stream().map(ResourceDTO::new).toList();
    }

    public void create(ResourceDTO resource) {
        ResourceEntity resourceEntity = new ResourceEntity(resource);
        resourceRepository.save(resourceEntity);
    }

    public ResourceDTO update(ResourceDTO resourceDTO) {
        // Verify if user id is empty
        ResourceEntity existingResource = resourceRepository.findById(resourceDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found")); // Lança exceção se não encontrar o usuário

        existingResource.setName(resourceDTO.getName());
        existingResource.setId(resourceDTO.getId());

        ResourceEntity updatedResource = resourceRepository.save(existingResource);

        return new ResourceDTO(updatedResource);
    }

    public void delete(Long id) {
        ResourceEntity resource = resourceRepository.findById(id).get();
        resourceRepository.delete(resource);
    }

    public ResourceDTO findById(Long id) {
        return new ResourceDTO(resourceRepository.findById(id).get());
    }
}
