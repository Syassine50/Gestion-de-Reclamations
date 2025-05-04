package tn.saaadouni.yassine.backend_gere.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tn.saaadouni.yassine.backend_gere.dto.SuiviReclamationDTO;
import tn.saaadouni.yassine.backend_gere.models.SuiviReclamation;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.repositories.ReclamationRepository;
import tn.saaadouni.yassine.backend_gere.repositories.AgentSAVRepository;

@Component
public class SuiviReclamationMapper {
    
    @Autowired
    private ReclamationRepository reclamationRepository;
    
    @Autowired
    private AgentSAVRepository agentRepository;

    public SuiviReclamationDTO toDto(SuiviReclamation suivi) {
        if (suivi == null) {
            return null;
        }

        SuiviReclamationDTO dto = new SuiviReclamationDTO();
        dto.setId(suivi.getId());
        dto.setMessage(suivi.getMessage());
        dto.setAction(suivi.getAction());
        dto.setDate(suivi.getDate());
        
        if (suivi.getReclamation() != null) {
            dto.setReclamationId(suivi.getReclamation().getId());
            dto.setReclamationProduit(suivi.getReclamation().getProduit());
        }
        
        if (suivi.getEmploye() != null) {
            dto.setEmployeId(suivi.getEmploye().getId());
            dto.setEmployeNom(suivi.getEmploye().getNom());
        }
        
        return dto;
    }

    public SuiviReclamation toEntity(SuiviReclamationDTO dto) {
        if (dto == null) {
            return null;
        }

        SuiviReclamation suivi = new SuiviReclamation();
        suivi.setId(dto.getId());
        suivi.setMessage(dto.getMessage());
        suivi.setAction(dto.getAction());
        suivi.setDate(dto.getDate());
        
        if (dto.getReclamationId() != null) {
            Reclamation reclamation = reclamationRepository.findById(dto.getReclamationId())
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id: " + dto.getReclamationId()));
            suivi.setReclamation(reclamation);
        }
        
        if (dto.getEmployeId() != null) {
            AgentSAV employe = agentRepository.findById(dto.getEmployeId())
                .orElseThrow(() -> new RuntimeException("Agent not found with id: " + dto.getEmployeId()));
            suivi.setEmploye(employe);
        }
        
        return suivi;
    }
}