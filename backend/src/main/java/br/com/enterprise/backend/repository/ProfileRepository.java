package br.com.enterprise.backend.repository;

import br.com.enterprise.backend.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

}
