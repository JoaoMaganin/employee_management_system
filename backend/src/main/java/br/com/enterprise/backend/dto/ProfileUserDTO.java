package br.com.enterprise.backend.dto;

import br.com.enterprise.backend.entity.ProfileUserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class ProfileUserDTO {

    private Long id;
    private UserDTO user;
    private ProfileDTO profile;

    public ProfileUserDTO(ProfileUserEntity profileUser) {
        BeanUtils.copyProperties(profileUser, this);

        if(profileUser != null && profileUser.getUser() != null) {
            this.user = new UserDTO(profileUser.getUser());
        }

        if(profileUser != null && profileUser.getProfile() != null) {
            this.profile = new ProfileDTO(profileUser.getProfile());
        }
    }
}
