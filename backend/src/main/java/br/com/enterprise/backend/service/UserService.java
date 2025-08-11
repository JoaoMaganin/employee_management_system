package br.com.enterprise.backend.service;

import br.com.enterprise.backend.dto.UserDTO;
import br.com.enterprise.backend.entity.UserEntity;
import br.com.enterprise.backend.entity.VerifyingUserEntity;
import br.com.enterprise.backend.entity.enums.UserStatusType;
import br.com.enterprise.backend.repository.UserRepository;
import br.com.enterprise.backend.repository.VerifyingUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerifyingUserRepository verifyingUserRepository;

    public List<UserDTO> listAll() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream().map(UserDTO::new).toList();
    }

    public void create(UserDTO user) {
        UserEntity userEntity = new UserEntity(user);
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(userEntity);
    }

    public void createNewUser(UserDTO newUser) {
        UserEntity userEntity = new UserEntity(newUser);
        userEntity.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userEntity.setStatus(UserStatusType.PENDING);
        userEntity.setId(null);
        userRepository.save(userEntity);

        VerifyingUserEntity checker = new VerifyingUserEntity();
        checker.setUserEntity(userEntity);
        checker.setUuid(UUID.randomUUID());
        checker.setExpirationTime(Instant.now().plusMillis(900000));
        verifyingUserRepository.save(checker);

        emailService.SendEmailText(newUser.getEmail(), "New user registred", "You are receiving a registration email, the number validation is: " + checker.getUuid());
    }

    public String checkUser(String uuid) {
        VerifyingUserEntity checkUser = verifyingUserRepository.findByUuid(UUID.fromString(uuid)).get();

        if(checkUser != null) {
            if(checkUser.getExpirationTime().compareTo(Instant.now()) >= 0) {
                UserEntity u = checkUser.getUserEntity();
                u.setStatus(UserStatusType.ACTIVE);
                userRepository.save(u);
                return "User checked";
            } else {
                verifyingUserRepository.delete(checkUser);
                return "Time for check expired";
            }
        } else {
            return "User not checked";
        }
    }

    public UserDTO update(UserDTO userDTO) {
        // Verify if user id is empty
        UserEntity existingUser = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found")); // Lança exceção se não encontrar o usuário

        existingUser.setName(userDTO.getName());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        UserEntity updatedUser = userRepository.save(existingUser);

        return new UserDTO(updatedUser);
    }

    public void delete(Long id) {
        UserEntity user = userRepository.findById(id).get();
        userRepository.delete(user);
    }

    public UserDTO findById(Long id) {
        return new UserDTO(userRepository.findById(id).get());
    }
}
