package br.com.enterprise.backend.service;

import br.com.enterprise.backend.dto.ProfileUserDTO;
import br.com.enterprise.backend.entity.ProfileUserEntity;
import br.com.enterprise.backend.repository.ProfileUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileUserService {

    @Autowired
    private ProfileUserRepository profileUserRepository;

    public List<ProfileUserDTO> listAll() {
        List<ProfileUserEntity> profileUsers = profileUserRepository.findAll();
        return profileUsers.stream().map(ProfileUserDTO::new).toList();
    }

    public void create(ProfileUserDTO resource) {
        ProfileUserEntity resourceEntity = new ProfileUserEntity(resource);
        profileUserRepository.save(resourceEntity);
    }

    public ProfileUserDTO update(ProfileUserDTO profileUser) {
        ProfileUserEntity profileUserEntity = new ProfileUserEntity(profileUser);
        return new ProfileUserDTO(profileUserRepository.save(profileUserEntity));
    }

    public void delete(Long id) {
        ProfileUserEntity profileUser = profileUserRepository.findById(id).get();
        profileUserRepository.delete(profileUser);
    }

    public ProfileUserDTO findById(Long id) {
        return new ProfileUserDTO(profileUserRepository.findById(id).get());
    }
}
