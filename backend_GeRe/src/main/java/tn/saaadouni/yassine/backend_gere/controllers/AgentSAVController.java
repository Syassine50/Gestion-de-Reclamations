package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin("*")
public class AgentSAVController {

    @Autowired
    private AgentSAVService agentSAVService;

    @PostMapping
    public ResponseEntity<AgentSAV> createAgent(@RequestBody AgentSAV agent) {
        return ResponseEntity.ok(agentSAVService.saveAgent(agent));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgentSAV> updateAgent(@PathVariable Long id, @RequestBody AgentSAV agent) {
        agent.setId(id);
        return ResponseEntity.ok(agentSAVService.updateAgent(agent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id) {
        agentSAVService.deleteAgent(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgentSAV> getAgent(@PathVariable Long id) {
        return ResponseEntity.ok(agentSAVService.getAgentById(id));
    }

    @GetMapping
    public ResponseEntity<List<AgentSAV>> getAllAgents() {
        return ResponseEntity.ok(agentSAVService.getAllAgents());
    }

    @GetMapping("/competence/{competence}")
    public ResponseEntity<List<AgentSAV>> getAgentsByCompetence(@PathVariable String competence) {
        return ResponseEntity.ok(agentSAVService.getAgentsByCompetence(competence));
    }
}