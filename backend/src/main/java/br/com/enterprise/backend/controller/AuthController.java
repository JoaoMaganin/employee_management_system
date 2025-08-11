package br.com.enterprise.backend.controller;

import br.com.enterprise.backend.dto.AuthenticationDTO;
import br.com.enterprise.backend.dto.UserDTO;
import br.com.enterprise.backend.service.AuthService;
import br.com.enterprise.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO authDTO){
        return ResponseEntity.ok(authService.login(authDTO));
    };

    @PostMapping(value = "/newUser")
    public void createNewUser(@RequestBody UserDTO newUser) {
        userService.createNewUser(newUser);
    }

    @GetMapping(value = "/checkUser/{uuid}")
    public String checkUser(@PathVariable("uuid") String uuid) {
        return userService.checkUser(uuid);
    }
}
