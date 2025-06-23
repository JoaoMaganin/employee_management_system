package br.com.enterprise.backend.dto;

import br.com.enterprise.backend.entity.ProfileResourcePermissionEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class ProfileResourcePermissionDTO {

    private Long id;
    private ResourceDTO resource;
    private ProfileDTO profile;

    public ProfileResourcePermissionDTO(ProfileResourcePermissionEntity profileResourcePermission) {
        BeanUtils.copyProperties(profileResourcePermission, this);

        if(profileResourcePermission != null && profileResourcePermission.getResource() != null) {
            this.resource = new ResourceDTO(profileResourcePermission.getResource());
        }

        if(profileResourcePermission != null && profileResourcePermission.getProfile() != null) {
            this.profile = new ProfileDTO(profileResourcePermission.getProfile());
        }
    }
}
