package tn.saaadouni.yassine.backend_gere.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.saaadouni.yassine.backend_gere.models.SuiviReclamation;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.repositories.SuiviReclamationRepository;
import tn.saaadouni.yassine.backend_gere.repositories.ReclamationRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class SuiviReclamationService {

    @Autowired
    private SuiviReclamationRepository suiviReclamationRepository;
    
    @Autowired
    private ReclamationRepository reclamationRepository;

    public SuiviReclamation saveSuivi(SuiviReclamation suivi) {
        validateSuivi(suivi);
        if (suivi.getDate() == null) {
            suivi.setDate(LocalDate.now());
        }
        
        // Mettre à jour le statut de la réclamation en fonction de l'action
        updateReclamationStatus(suivi);
        
        return suiviReclamationRepository.save(suivi);
    }

    public SuiviReclamation updateSuivi(SuiviReclamation suivi) {
        validateSuivi(suivi);
        SuiviReclamation existingSuivi = getSuiviById(suivi.getId());
        
        // Conserver la date originale
        if (existingSuivi.getDate() != null) {
            suivi.setDate(existingSuivi.getDate());
        }
        
        return suiviReclamationRepository.save(suivi);
    }

    public void deleteSuivi(Long id) {
        suiviReclamationRepository.deleteById(id);
    }

    public SuiviReclamation getSuiviById(Long id) {
        return suiviReclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Suivi not found with id: " + id));
    }

    public List<SuiviReclamation> getAllSuivis() {
        return suiviReclamationRepository.findAll();
    }

    public List<SuiviReclamation> getSuivisByReclamation(Reclamation reclamation) {
        return suiviReclamationRepository.findByReclamation(reclamation);
    }

    public List<SuiviReclamation> getSuivisByEmploye(AgentSAV employe) {
        return suiviReclamationRepository.findByEmploye(employe);
    }

    public List<SuiviReclamation> getSuivisByDate(LocalDate date) {
        return suiviReclamationRepository.findByDate(date);
    }

    public List<SuiviReclamation> getSuivisByAction(String action) {
        return suiviReclamationRepository.findByAction(action);
    }

    // Méthodes utilitaires privées
    private void validateSuivi(SuiviReclamation suivi) {
        if (suivi == null) {
            throw new IllegalArgumentException("Le suivi ne peut pas être null");
        }
        if (suivi.getReclamation() == null) {
            throw new IllegalArgumentException("La réclamation est obligatoire");
        }
        if (suivi.getEmploye() == null) {
            throw new IllegalArgumentException("L'employé est obligatoire");
        }
        if (suivi.getMessage() == null || suivi.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Le message est obligatoire");
        }
        if (suivi.getAction() == null || suivi.getAction().trim().isEmpty()) {
            throw new IllegalArgumentException("L'action est obligatoire");
        }
    }

    private void updateReclamationStatus(SuiviReclamation suivi) {
        Reclamation reclamation = suivi.getReclamation();
        switch (suivi.getAction().toUpperCase()) {
            case "RESOLUTION":
                reclamation.setStatut("RÉSOLUE");
                break;
            case "EN_COURS":
                reclamation.setStatut("EN_TRAITEMENT");
                break;
            case "ATTENTE_CLIENT":
                reclamation.setStatut("EN_ATTENTE_CLIENT");
                break;
            case "CLOTURE":
                reclamation.setStatut("TERMINÉE");
                break;
        }
        reclamationRepository.save(reclamation);
    }
}