package br.com.enterprise.backend.dto;

import br.com.enterprise.backend.entity.UserEntity;
import org.springframework.beans.BeanUtils;

public class UserDTO {

    private Long Id;
    private String name;
    private String login;
    private String senha;
    private String email;

    public UserDTO(UserEntity user) {
        BeanUtils.copyProperties(user, this);
    }

    public UserDTO() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }
}
