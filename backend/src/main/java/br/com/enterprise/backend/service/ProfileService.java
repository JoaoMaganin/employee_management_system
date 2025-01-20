package br.com.enterprise.backend.service;

import br.com.enterprise.backend.dto.ProfileDTO;
import br.com.enterprise.backend.entity.ProfileEntity;
import br.com.enterprise.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public List<ProfileDTO> listAll() {
        List<ProfileEntity> profiles = profileRepository.findAll();
        return profiles.stream().map(ProfileDTO::new).toList();
    }

    public void create(ProfileDTO profile) {
        ProfileEntity profileEntity = new ProfileEntity(profile);
        profileRepository.save(profileEntity);
    }

    public ProfileDTO update(ProfileDTO profileDTO) {
        // Verify if user id is empty
        ProfileEntity existingProfile = profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found")); // Lança exceção se não encontrar o usuário

        existingProfile.setId(profileDTO.getId());
        existingProfile.setDescription(profileDTO.getDescription());

        ProfileEntity updatedProfile = profileRepository.save(existingProfile);

        return new ProfileDTO(updatedProfile);
    }

    public void delete(Long id) {
        ProfileEntity profile = profileRepository.findById(id).get();
        profileRepository.delete(profile);
    }

    public ProfileDTO findById(Long id) {
        return new ProfileDTO(profileRepository.findById(id).get());
    }
}
