package tn.saaadouni.yassine.backend_gere.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.saaadouni.yassine.backend_gere.models.Client;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByEmail(String email);
    Optional<Client> findByTelephone(String telephone);
}