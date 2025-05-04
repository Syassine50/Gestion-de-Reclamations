package tn.saaadouni.yassine.backend_gere.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.Client;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.repositories.ReclamationRepository;
import tn.saaadouni.yassine.backend_gere.repositories.AgentSAVRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.OptionalDouble;

@Service
@Transactional
public class ReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;

    @Autowired
    private AgentSAVRepository agentSAVRepository;

    public Reclamation saveReclamation(Reclamation reclamation) {
        validateReclamation(reclamation);
        if (reclamation.getDate() == null) {
            reclamation.setDate(LocalDate.now());
        }
        if (reclamation.getStatut() == null) {
            reclamation.setStatut("NOUVEAU");
        }
        return reclamationRepository.save(reclamation);
    }

    public Reclamation updateReclamation(Reclamation reclamation) {
        validateReclamation(reclamation);
        Reclamation existingReclamation = getReclamationById(reclamation.getId());
        
        // Preserve creation date if it exists
        if (existingReclamation.getDate() != null) {
            reclamation.setDate(existingReclamation.getDate());
        }
        
        return reclamationRepository.save(reclamation);
    }

    public void deleteReclamation(Long id) {
        reclamationRepository.deleteById(id);
    }

    public Reclamation getReclamationById(Long id) {
        return reclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réclamation not found with id: " + id));
    }

    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    public List<Reclamation> getReclamationsByClient(Client client) {
        return reclamationRepository.findByClient(client);
    }

    public List<Reclamation> getReclamationsByAgent(AgentSAV agent) {
        return reclamationRepository.findByAgent(agent);
    }

    public List<Reclamation> getReclamationsByStatut(String statut) {
        return reclamationRepository.findByStatut(statut);
    }

    public List<Reclamation> getReclamationsByDateBetween(LocalDate dateDebut, LocalDate dateFin) {
        if (dateDebut.isAfter(dateFin)) {
            throw new IllegalArgumentException("La date de début doit être antérieure à la date de fin");
        }
        return reclamationRepository.findByDateBetween(dateDebut, dateFin);
    }

    public List<Reclamation> getReclamationsByProduit(String produit) {
        return reclamationRepository.findByProduit(produit);
    }

    public List<Reclamation> getReclamationsByNote(int note) {
        if (note < 0 || note > 5) {
            throw new IllegalArgumentException("La note doit être comprise entre 0 et 5");
        }
        return reclamationRepository.findByNote(note);
    }

    public Reclamation assignerAgent(Long reclamationId, Long agentId) {
        Reclamation reclamation = getReclamationById(reclamationId);
        AgentSAV agent = agentSAVRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found with id: " + agentId));
        
        // Vérifier si l'agent est déjà assigné à trop de réclamations
        long reclamationsEnCours = reclamationRepository.findByAgent(agent)
                .stream()
                .filter(r -> !r.getStatut().equals("TERMINÉE"))
                .count();
                
        if (reclamationsEnCours >= 10) {
            throw new RuntimeException("L'agent a déjà trop de réclamations en cours");
        }
        
        reclamation.setAgent(agent);
        reclamation.setStatut("ASSIGNÉE");
        return reclamationRepository.save(reclamation);
    }

    public double getSatisfactionMoyenne() {
        List<Reclamation> reclamations = reclamationRepository.findAll();
        OptionalDouble moyenne = reclamations.stream()
                .filter(r -> r.getNote() > 0) // Ignorer les réclamations sans note
                .mapToInt(Reclamation::getNote)
                .average();
        return moyenne.orElse(0.0);
    }

    // Méthodes utilitaires privées
    private void validateReclamation(Reclamation reclamation) {
        if (reclamation == null) {
            throw new IllegalArgumentException("La réclamation ne peut pas être null");
        }
        if (reclamation.getClient() == null) {
            throw new IllegalArgumentException("Le client est obligatoire");
        }
        if (reclamation.getProduit() == null || reclamation.getProduit().trim().isEmpty()) {
            throw new IllegalArgumentException("Le produit est obligatoire");
        }
        if (reclamation.getDescription() == null || reclamation.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("La description est obligatoire");
        }
        if (reclamation.getNote() < 0 || reclamation.getNote() > 5) {
            throw new IllegalArgumentException("La note doit être comprise entre 0 et 5");
        }
    }
}