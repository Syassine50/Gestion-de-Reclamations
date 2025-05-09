package tn.saaadouni.yassine.backend_gere.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface AgentSAVRepository extends JpaRepository<AgentSAV, Long> {
    List<AgentSAV> findByCompetence(String competence);
    Page<AgentSAV> findByCompetence(String competence, Pageable pageable);
}