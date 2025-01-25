package br.com.enterprise.backend.repository;

import br.com.enterprise.backend.entity.ProfileUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileUserRepository extends JpaRepository<ProfileUserEntity, Long> {

}
