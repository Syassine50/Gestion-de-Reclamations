package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.dto.ReclamationDTO;
import tn.saaadouni.yassine.backend_gere.mapper.ReclamationMapper;
import tn.saaadouni.yassine.backend_gere.models.Client;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.services.ReclamationService;
import tn.saaadouni.yassine.backend_gere.services.ClientService;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private ReclamationMapper reclamationMapper;

    @PostMapping
    public ResponseEntity<ReclamationDTO> createReclamation(@RequestBody ReclamationDTO reclamationDTO) {
        return ResponseEntity.ok(
            reclamationMapper.toDto(
                reclamationService.saveReclamation(
                    reclamationMapper.toEntity(reclamationDTO)
                )
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReclamationDTO> updateReclamation(@PathVariable Long id, @RequestBody ReclamationDTO reclamationDTO) {
        reclamationDTO.setId(id);
        return ResponseEntity.ok(
            reclamationMapper.toDto(
                reclamationService.updateReclamation(
                    reclamationMapper.toEntity(reclamationDTO)
                )
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReclamationDTO> getReclamation(@PathVariable Long id) {
        return ResponseEntity.ok(
            reclamationMapper.toDto(
                reclamationService.getReclamationById(id)
            )
        );
    }

    @GetMapping
    public ResponseEntity<List<ReclamationDTO>> getAllReclamations() {
        return ResponseEntity.ok(
            reclamationService.getAllReclamations().stream()
                .map(reclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ReclamationDTO>> getReclamationsByClient(@PathVariable Long clientId) {
        Client client = clientService.getClientById(clientId);
        return ResponseEntity.ok(
            reclamationService.getReclamationsByClient(client).stream()
                .map(reclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<ReclamationDTO>> getReclamationsByAgent(@PathVariable Long agentId) {
        AgentSAV agent = agentSAVService.getAgentById(agentId);
        return ResponseEntity.ok(
            reclamationService.getReclamationsByAgent(agent).stream()
                .map(reclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<ReclamationDTO>> getReclamationsByStatut(@PathVariable String statut) {
        return ResponseEntity.ok(
            reclamationService.getReclamationsByStatut(statut).stream()
                .map(reclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/date")
    public ResponseEntity<List<ReclamationDTO>> getReclamationsByDateBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateDebut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFin) {
        return ResponseEntity.ok(
            reclamationService.getReclamationsByDateBetween(dateDebut, dateFin).stream()
                .map(reclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/produit/{produit}")
    public ResponseEntity<List<ReclamationDTO>> getReclamationsByProduit(@PathVariable String produit) {
        return ResponseEntity.ok(
            reclamationService.getReclamationsByProduit(produit).stream()
                .map(reclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/note/{note}")
    public ResponseEntity<List<ReclamationDTO>> getReclamationsByNote(@PathVariable int note) {
        return ResponseEntity.ok(
            reclamationService.getReclamationsByNote(note).stream()
                .map(reclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @PutMapping("/{reclamationId}/assigner/{agentId}")
    public ResponseEntity<ReclamationDTO> assignerAgent(
            @PathVariable Long reclamationId,
            @PathVariable Long agentId) {
        return ResponseEntity.ok(
            reclamationMapper.toDto(
                reclamationService.assignerAgent(reclamationId, agentId)
            )
        );
    }

    @GetMapping("/satisfaction")
    public ResponseEntity<Double> getSatisfactionMoyenne() {
        return ResponseEntity.ok(reclamationService.getSatisfactionMoyenne());
    }
}