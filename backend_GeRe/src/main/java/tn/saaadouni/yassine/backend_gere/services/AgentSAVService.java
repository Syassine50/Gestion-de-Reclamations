package tn.saaadouni.yassine.backend_gere.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.repositories.AgentSAVRepository;

import java.util.List;

@Service
public class AgentSAVService {

    @Autowired
    private AgentSAVRepository agentSAVRepository;

    public AgentSAV saveAgent(AgentSAV agent) {
        return agentSAVRepository.save(agent);
    }

    public AgentSAV updateAgent(AgentSAV agent) {
        return agentSAVRepository.save(agent);
    }

    public void deleteAgent(Long id) {
        agentSAVRepository.deleteById(id);
    }

    public AgentSAV getAgentById(Long id) {
        return agentSAVRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agent not found with id: " + id));
    }

    public Page<AgentSAV> getAllAgents(Pageable pageable) {
        return agentSAVRepository.findAll(pageable);
    }

    public Page<AgentSAV> getAgentsByCompetence(String competence, Pageable pageable) {
        return agentSAVRepository.findByCompetence(competence, pageable);
    }

    // Keep the non-paginated methods for backward compatibility
    public List<AgentSAV> getAllAgents() {
        return agentSAVRepository.findAll();
    }

    public List<AgentSAV> getAgentsByCompetence(String competence) {
        return agentSAVRepository.findByCompetence(competence);
    }
}