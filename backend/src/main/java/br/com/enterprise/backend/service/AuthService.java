package br.com.enterprise.backend.service;

import br.com.enterprise.backend.dto.AcessDTO;
import br.com.enterprise.backend.dto.AuthenticationDTO;
import br.com.enterprise.backend.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public AcessDTO login(AuthenticationDTO authDTO){

        try {
            // create credentials engine for spring
            UsernamePasswordAuthenticationToken userAuth = new UsernamePasswordAuthenticationToken(authDTO.getUsername(), authDTO.getPassword());

            // prepares mechanism for authentication
            Authentication authentication = authenticationManager.authenticate(userAuth);

            //search logged user
            UserDetailsImpl userAuthenticate = (UserDetailsImpl)authentication.getPrincipal();

            String token = jwtUtils.generateTokenFromUserDetailsImpl(userAuthenticate);

            AcessDTO acessDTO = new AcessDTO(token);

            return acessDTO;

        } catch (BadCredentialsException e) {
            // TODO: INVALID USERNAME OR PASSWORD
        }

        return new AcessDTO("Acesso negado");
    }
}
