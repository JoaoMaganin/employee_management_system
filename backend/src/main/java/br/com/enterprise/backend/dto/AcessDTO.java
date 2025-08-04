package br.com.enterprise.backend.dto;

public class AcessDTO {

    // TODO: IMPLEMENT RETURN USERS AND AUTHORITIES
    private String token;

    public AcessDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
