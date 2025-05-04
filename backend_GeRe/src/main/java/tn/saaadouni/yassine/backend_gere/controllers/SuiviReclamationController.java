package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.models.SuiviReclamation;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.services.SuiviReclamationService;
import tn.saaadouni.yassine.backend_gere.services.ReclamationService;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/suivis")
@CrossOrigin("*")
public class SuiviReclamationController {

    @Autowired
    private SuiviReclamationService suiviReclamationService;

    @Autowired
    private ReclamationService reclamationService;

    @Autowired
    private AgentSAVService agentSAVService;

    @PostMapping
    public ResponseEntity<SuiviReclamation> createSuivi(@RequestBody SuiviReclamation suivi) {
        return ResponseEntity.ok(suiviReclamationService.saveSuivi(suivi));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuiviReclamation> updateSuivi(@PathVariable Long id, @RequestBody SuiviReclamation suivi) {
        suivi.setId(id);
        return ResponseEntity.ok(suiviReclamationService.updateSuivi(suivi));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSuivi(@PathVariable Long id) {
        suiviReclamationService.deleteSuivi(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuiviReclamation> getSuivi(@PathVariable Long id) {
        return ResponseEntity.ok(suiviReclamationService.getSuiviById(id));
    }

    @GetMapping
    public ResponseEntity<List<SuiviReclamation>> getAllSuivis() {
        return ResponseEntity.ok(suiviReclamationService.getAllSuivis());
    }

    @GetMapping("/reclamation/{reclamationId}")
    public ResponseEntity<List<SuiviReclamation>> getSuivisByReclamation(@PathVariable Long reclamationId) {
        Reclamation reclamation = reclamationService.getReclamationById(reclamationId);
        return ResponseEntity.ok(suiviReclamationService.getSuivisByReclamation(reclamation));
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<SuiviReclamation>> getSuivisByAgent(@PathVariable Long agentId) {
        AgentSAV agent = agentSAVService.getAgentById(agentId);
        return ResponseEntity.ok(suiviReclamationService.getSuivisByEmploye(agent));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<SuiviReclamation>> getSuivisByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(suiviReclamationService.getSuivisByDate(date));
    }

    @GetMapping("/action/{action}")
    public ResponseEntity<List<SuiviReclamation>> getSuivisByAction(@PathVariable String action) {
        return ResponseEntity.ok(suiviReclamationService.getSuivisByAction(action));
    }
}