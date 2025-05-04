package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.dto.AgentSAVDTO;
import tn.saaadouni.yassine.backend_gere.mapper.AgentSAVMapper;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin("*")
public class AgentSAVController {

    @Autowired
    private AgentSAVService agentSAVService;

    @Autowired
    private AgentSAVMapper agentSAVMapper;

    @PostMapping
    public ResponseEntity<AgentSAVDTO> createAgent(@RequestBody AgentSAVDTO agentDTO) {
        return ResponseEntity.ok(
            agentSAVMapper.toDto(
                agentSAVService.saveAgent(
                    agentSAVMapper.toEntity(agentDTO)
                )
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgentSAVDTO> updateAgent(@PathVariable Long id, @RequestBody AgentSAVDTO agentDTO) {
        agentDTO.setId(id);
        return ResponseEntity.ok(
            agentSAVMapper.toDto(
                agentSAVService.updateAgent(
                    agentSAVMapper.toEntity(agentDTO)
                )
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id) {
        agentSAVService.deleteAgent(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgentSAVDTO> getAgent(@PathVariable Long id) {
        return ResponseEntity.ok(
            agentSAVMapper.toDto(
                agentSAVService.getAgentById(id)
            )
        );
    }

    @GetMapping
    public ResponseEntity<List<AgentSAVDTO>> getAllAgents() {
        return ResponseEntity.ok(
            agentSAVService.getAllAgents().stream()
                .map(agentSAVMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/competence/{competence}")
    public ResponseEntity<List<AgentSAVDTO>> getAgentsByCompetence(@PathVariable String competence) {
        return ResponseEntity.ok(
            agentSAVService.getAgentsByCompetence(competence).stream()
                .map(agentSAVMapper::toDto)
                .collect(Collectors.toList())
        );
    }
}