package br.com.enterprise.backend.service;

import br.com.enterprise.backend.dto.ProfileResourcePermissionDTO;
import br.com.enterprise.backend.entity.ProfileResourcePermissionEntity;
import br.com.enterprise.backend.repository.ProfileResourcePermissionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileResourcePermissionService {

    @Autowired
    private ProfileResourcePermissionRepository profileResourcePermissionRepository;

    public List<ProfileResourcePermissionDTO> listAll() {
        List<ProfileResourcePermissionEntity> profileResourcesPermissions = profileResourcePermissionRepository.findAll();
        return profileResourcesPermissions.stream().map(ProfileResourcePermissionDTO::new).toList();
    }

    public void create(ProfileResourcePermissionDTO resourcePermission) {
        ProfileResourcePermissionEntity resourceEntity = new ProfileResourcePermissionEntity(resourcePermission);
        profileResourcePermissionRepository.save(resourceEntity);
    }

    public ProfileResourcePermissionDTO update(ProfileResourcePermissionDTO profileResourcePermission) {
        ProfileResourcePermissionEntity profileResourcePermissionEntity = new ProfileResourcePermissionEntity(profileResourcePermission);
        return new ProfileResourcePermissionDTO(profileResourcePermissionRepository.save(profileResourcePermissionEntity));
    }

    public void delete(Long id) {
        ProfileResourcePermissionEntity profileResource = profileResourcePermissionRepository.findById(id).get();
        profileResourcePermissionRepository.delete(profileResource);
    }

    public ProfileResourcePermissionDTO findById(Long id) {
        return new ProfileResourcePermissionDTO(profileResourcePermissionRepository.findById(id).get());
    }
}
