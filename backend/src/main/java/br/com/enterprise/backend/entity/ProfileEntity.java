package br.com.enterprise.backend.entity;

import br.com.enterprise.backend.dto.ProfileDTO;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.Objects;


@Entity
@Table(name = "ETP_PROFILE")
public class ProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProfileEntity(ProfileDTO profile) {
        BeanUtils.copyProperties(profile, this);
    }

    public ProfileEntity() {}

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ProfileEntity that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
