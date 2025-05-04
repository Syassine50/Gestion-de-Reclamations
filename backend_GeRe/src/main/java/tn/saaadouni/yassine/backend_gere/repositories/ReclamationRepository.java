package tn.saaadouni.yassine.backend_gere.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.Client;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;

import java.time.LocalDate;
import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    List<Reclamation> findByClient(Client client);
    List<Reclamation> findByAgent(AgentSAV agent);
    List<Reclamation> findByStatut(String statut);
    List<Reclamation> findByDateBetween(LocalDate dateDebut, LocalDate dateFin);
    List<Reclamation> findByProduit(String produit);
    List<Reclamation> findByNote(int note);
}