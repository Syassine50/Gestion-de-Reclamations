package tn.saaadouni.yassine.backend_gere.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.saaadouni.yassine.backend_gere.models.SuiviReclamation;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;

import java.time.LocalDate;
import java.util.List;

public interface SuiviReclamationRepository extends JpaRepository<SuiviReclamation, Long> {
    List<SuiviReclamation> findByReclamation(Reclamation reclamation);
    List<SuiviReclamation> findByEmploye(AgentSAV employe);
    List<SuiviReclamation> findByDate(LocalDate date);
    List<SuiviReclamation> findByAction(String action);
}