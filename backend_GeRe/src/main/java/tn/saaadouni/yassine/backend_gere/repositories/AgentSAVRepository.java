package tn.saaadouni.yassine.backend_gere.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;

import java.util.List;

public interface AgentSAVRepository extends JpaRepository<AgentSAV, Long> {
    List<AgentSAV> findByCompetence(String competence);
}