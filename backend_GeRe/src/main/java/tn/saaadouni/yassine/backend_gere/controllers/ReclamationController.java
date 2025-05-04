package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.Client;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.services.ReclamationService;
import tn.saaadouni.yassine.backend_gere.services.ClientService;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin("*")
public class ReclamationController {

    @Autowired
    private ReclamationService reclamationService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private AgentSAVService agentSAVService;

    @PostMapping
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) {
        return ResponseEntity.ok(reclamationService.saveReclamation(reclamation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable Long id, @RequestBody Reclamation reclamation) {
        reclamation.setId(id);
        return ResponseEntity.ok(reclamationService.updateReclamation(reclamation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getReclamation(@PathVariable Long id) {
        return ResponseEntity.ok(reclamationService.getReclamationById(id));
    }

    @GetMapping
    public ResponseEntity<List<Reclamation>> getAllReclamations() {
        return ResponseEntity.ok(reclamationService.getAllReclamations());
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Reclamation>> getReclamationsByClient(@PathVariable Long clientId) {
        Client client = clientService.getClientById(clientId);
        return ResponseEntity.ok(reclamationService.getReclamationsByClient(client));
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<Reclamation>> getReclamationsByAgent(@PathVariable Long agentId) {
        AgentSAV agent = agentSAVService.getAgentById(agentId);
        return ResponseEntity.ok(reclamationService.getReclamationsByAgent(agent));
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Reclamation>> getReclamationsByStatut(@PathVariable String statut) {
        return ResponseEntity.ok(reclamationService.getReclamationsByStatut(statut));
    }

    @GetMapping("/date")
    public ResponseEntity<List<Reclamation>> getReclamationsByDateBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateDebut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFin) {
        return ResponseEntity.ok(reclamationService.getReclamationsByDateBetween(dateDebut, dateFin));
    }

    @GetMapping("/produit/{produit}")
    public ResponseEntity<List<Reclamation>> getReclamationsByProduit(@PathVariable String produit) {
        return ResponseEntity.ok(reclamationService.getReclamationsByProduit(produit));
    }

    @GetMapping("/note/{note}")
    public ResponseEntity<List<Reclamation>> getReclamationsByNote(@PathVariable int note) {
        return ResponseEntity.ok(reclamationService.getReclamationsByNote(note));
    }

    @PutMapping("/{reclamationId}/assigner/{agentId}")
    public ResponseEntity<Reclamation> assignerAgent(
            @PathVariable Long reclamationId,
            @PathVariable Long agentId) {
        return ResponseEntity.ok(reclamationService.assignerAgent(reclamationId, agentId));
    }

    @GetMapping("/satisfaction")
    public ResponseEntity<Double> getSatisfactionMoyenne() {
        return ResponseEntity.ok(reclamationService.getSatisfactionMoyenne());
    }
}