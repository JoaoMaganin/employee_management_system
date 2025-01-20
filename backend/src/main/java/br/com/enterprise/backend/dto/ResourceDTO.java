package br.com.enterprise.backend.dto;

import br.com.enterprise.backend.entity.ResourceEntity;
import org.springframework.beans.BeanUtils;

import java.util.Objects;

public class ResourceDTO {

    private Long id;
    private String name;
    private String key;

    public ResourceDTO() {}

    public ResourceDTO(ResourceEntity resource) {
        BeanUtils.copyProperties(resource, this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ResourceDTO that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
