package tn.saaadouni.yassine.backend_gere.dto;

import lombok.Data;

@Data
public class AgentSAVDTO {
    private Long id;
    private String nom;
    private String competence;
    private int nombreReclamations;
}