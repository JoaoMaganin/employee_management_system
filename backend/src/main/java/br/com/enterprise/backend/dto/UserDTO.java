package br.com.enterprise.backend.dto;

import br.com.enterprise.backend.entity.UserEntity;
import br.com.enterprise.backend.entity.enums.UserStatusType;
import org.springframework.beans.BeanUtils;

public class UserDTO {

    private Long Id;
    private String name;
    private String login;
    private String password;
    private String email;
    private UserStatusType status;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public UserStatusType getStatus() {
        return status;
    }

    public void setStatus(UserStatusType status) {
        this.status = status;
    }
}
