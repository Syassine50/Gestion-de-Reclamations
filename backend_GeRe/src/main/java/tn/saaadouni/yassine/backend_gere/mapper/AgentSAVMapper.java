package tn.saaadouni.yassine.backend_gere.mapper;

import org.springframework.stereotype.Component;
import tn.saaadouni.yassine.backend_gere.dto.AgentSAVDTO;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;

@Component
public class AgentSAVMapper {
    
    public AgentSAVDTO toDto(AgentSAV agent) {
        if (agent == null) {
            return null;
        }

        AgentSAVDTO dto = new AgentSAVDTO();
        dto.setId(agent.getId());
        dto.setNom(agent.getNom());
        dto.setCompetence(agent.getCompetence());
        dto.setNombreReclamations(agent.getListeReclamation() != null ? agent.getListeReclamation().size() : 0);
        
        return dto;
    }

    public AgentSAV toEntity(AgentSAVDTO dto) {
        if (dto == null) {
            return null;
        }

        AgentSAV agent = new AgentSAV();
        agent.setId(dto.getId());
        agent.setNom(dto.getNom());
        agent.setCompetence(dto.getCompetence());
        
        return agent;
    }
}