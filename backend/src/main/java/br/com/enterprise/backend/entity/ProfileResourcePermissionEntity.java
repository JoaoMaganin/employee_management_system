package br.com.enterprise.backend.entity;

import br.com.enterprise.backend.dto.ProfileResourcePermissionDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Entity
@Table(name = "ETP_PROFILE_RESOURCE_PERMISSION")
@Getter
@Setter
@NoArgsConstructor
public class ProfileResourcePermissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_RESOURCE")
    private ResourceEntity resource;

    @ManyToOne
    @JoinColumn(name = "ID_PROFILE")
    private ProfileEntity profile;

    public ProfileResourcePermissionEntity(ProfileResourcePermissionDTO profileResourcePermission) {
        BeanUtils.copyProperties(profileResourcePermission, this);

        if(profileResourcePermission.getResource() != null) {
            this.resource = new ResourceEntity(profileResourcePermission.getResource());
        }

        if(profileResourcePermission.getProfile() != null) {
            this.profile = new ProfileEntity((profileResourcePermission.getProfile()));
        }
    }
}
