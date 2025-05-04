package tn.saaadouni.yassine.backend_gere.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SuiviReclamationDTO {
    private Long id;
    private String message;
    private String action;
    private LocalDate date;
    private Long reclamationId;
    private String reclamationProduit;
    private Long employeId;
    private String employeNom;
}