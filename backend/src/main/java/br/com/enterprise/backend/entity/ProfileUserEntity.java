package br.com.enterprise.backend.entity;

import br.com.enterprise.backend.dto.ProfileUserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Entity
@Table(name = "ETP_PROFILE_USER")
@Getter
@Setter
@NoArgsConstructor
public class ProfileUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_USER")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "ID_PROFILE")
    private ProfileEntity profile;

    public ProfileUserEntity(ProfileUserDTO profileUser) {
        BeanUtils.copyProperties(profileUser, this);

        if(profileUser.getUser() != null) {
            this.user = new UserEntity(profileUser.getUser());
        }

        if(profileUser.getProfile() != null) {
            this.profile = new ProfileEntity((profileUser.getProfile()));
        }
    }
}
