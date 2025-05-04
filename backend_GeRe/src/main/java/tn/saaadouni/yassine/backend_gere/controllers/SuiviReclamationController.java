package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.dto.SuiviReclamationDTO;
import tn.saaadouni.yassine.backend_gere.mapper.SuiviReclamationMapper;
import tn.saaadouni.yassine.backend_gere.models.Reclamation;
import tn.saaadouni.yassine.backend_gere.models.AgentSAV;
import tn.saaadouni.yassine.backend_gere.services.SuiviReclamationService;
import tn.saaadouni.yassine.backend_gere.services.ReclamationService;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private SuiviReclamationMapper suiviReclamationMapper;

    @PostMapping
    public ResponseEntity<SuiviReclamationDTO> createSuivi(@RequestBody SuiviReclamationDTO suiviDTO) {
        return ResponseEntity.ok(
            suiviReclamationMapper.toDto(
                suiviReclamationService.saveSuivi(
                    suiviReclamationMapper.toEntity(suiviDTO)
                )
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuiviReclamationDTO> updateSuivi(@PathVariable Long id, @RequestBody SuiviReclamationDTO suiviDTO) {
        suiviDTO.setId(id);
        return ResponseEntity.ok(
            suiviReclamationMapper.toDto(
                suiviReclamationService.updateSuivi(
                    suiviReclamationMapper.toEntity(suiviDTO)
                )
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSuivi(@PathVariable Long id) {
        suiviReclamationService.deleteSuivi(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuiviReclamationDTO> getSuivi(@PathVariable Long id) {
        return ResponseEntity.ok(
            suiviReclamationMapper.toDto(
                suiviReclamationService.getSuiviById(id)
            )
        );
    }

    @GetMapping
    public ResponseEntity<List<SuiviReclamationDTO>> getAllSuivis() {
        return ResponseEntity.ok(
            suiviReclamationService.getAllSuivis().stream()
                .map(suiviReclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/reclamation/{reclamationId}")
    public ResponseEntity<List<SuiviReclamationDTO>> getSuivisByReclamation(@PathVariable Long reclamationId) {
        Reclamation reclamation = reclamationService.getReclamationById(reclamationId);
        return ResponseEntity.ok(
            suiviReclamationService.getSuivisByReclamation(reclamation).stream()
                .map(suiviReclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<SuiviReclamationDTO>> getSuivisByAgent(@PathVariable Long agentId) {
        AgentSAV agent = agentSAVService.getAgentById(agentId);
        return ResponseEntity.ok(
            suiviReclamationService.getSuivisByEmploye(agent).stream()
                .map(suiviReclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<SuiviReclamationDTO>> getSuivisByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(
            suiviReclamationService.getSuivisByDate(date).stream()
                .map(suiviReclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/action/{action}")
    public ResponseEntity<List<SuiviReclamationDTO>> getSuivisByAction(@PathVariable String action) {
        return ResponseEntity.ok(
            suiviReclamationService.getSuivisByAction(action).stream()
                .map(suiviReclamationMapper::toDto)
                .collect(Collectors.toList())
        );
    }
}