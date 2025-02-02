package br.com.enterprise.backend.dto;

import br.com.enterprise.backend.entity.ProfileEntity;
import org.springframework.beans.BeanUtils;

import java.util.Objects;


public class ProfileDTO{

    private Long id;
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

    public ProfileDTO(ProfileEntity profile) {
        BeanUtils.copyProperties(profile, this);
    }

    public ProfileDTO() {}

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ProfileDTO that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
