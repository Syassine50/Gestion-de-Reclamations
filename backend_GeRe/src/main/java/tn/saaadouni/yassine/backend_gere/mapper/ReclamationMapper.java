package tn.saaadouni.yassine.backend_gere.mapper;

import org.springframework.stereotype.Component;
import tn.saaadouni.yassine.backend_gere.dto.ReclamationDTO;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.Client;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.repositories.ClientRepository;
import tn.saaadouni.yassine.backend_gere.repositories.AgentSAVRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class ReclamationMapper {
    
    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private AgentSAVRepository agentRepository;

    public ReclamationDTO toDto(Reclamation reclamation) {
        if (reclamation == null) {
            return null;
        }

        ReclamationDTO dto = new ReclamationDTO();
        dto.setId(reclamation.getId());
        dto.setProduit(reclamation.getProduit());
        dto.setStatut(reclamation.getStatut());
        dto.setDescription(reclamation.getDescription());
        dto.setDate(reclamation.getDate());
        dto.setNote(reclamation.getNote());
        
        if (reclamation.getClient() != null) {
            dto.setClientId(reclamation.getClient().getId());
            dto.setClientNom(reclamation.getClient().getNom());
        }
        
        if (reclamation.getAgent() != null) {
            dto.setAgentId(reclamation.getAgent().getId());
            dto.setAgentNom(reclamation.getAgent().getNom());
        }
        
        dto.setNombreSuivis(reclamation.getListeSuivi() != null ? reclamation.getListeSuivi().size() : 0);
        
        return dto;
    }

    public Reclamation toEntity(ReclamationDTO dto) {
        if (dto == null) {
            return null;
        }

        Reclamation reclamation = new Reclamation();
        reclamation.setId(dto.getId());
        reclamation.setProduit(dto.getProduit());
        reclamation.setStatut(dto.getStatut());
        reclamation.setDescription(dto.getDescription());
        reclamation.setDate(dto.getDate());
        reclamation.setNote(dto.getNote());
        
        if (dto.getClientId() != null) {
            Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + dto.getClientId()));
            reclamation.setClient(client);
        }
        
        if (dto.getAgentId() != null) {
            AgentSAV agent = agentRepository.findById(dto.getAgentId())
                .orElseThrow(() -> new RuntimeException("Agent not found with id: " + dto.getAgentId()));
            reclamation.setAgent(agent);
        }
        
        return reclamation;
    }
}