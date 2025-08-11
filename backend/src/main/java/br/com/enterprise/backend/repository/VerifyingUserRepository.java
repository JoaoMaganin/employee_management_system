package br.com.enterprise.backend.repository;

import br.com.enterprise.backend.entity.UserEntity;
import br.com.enterprise.backend.entity.VerifyingUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface VerifyingUserRepository extends JpaRepository<VerifyingUserEntity, Long> {

    public Optional<VerifyingUserEntity> findByUuid(UUID uuid);
}
