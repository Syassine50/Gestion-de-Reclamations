package tn.saaadouni.yassine.backend_gere.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReclamationDTO {
    private Long id;
    private String produit;
    private String statut;
    private String description;
    private LocalDate date;
    private int note;
    private Long clientId;
    private String clientNom;
    private Long agentId;
    private String agentNom;
    private int nombreSuivis;
}