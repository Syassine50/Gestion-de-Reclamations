package tn.saaadouni.yassine.backend_gere.dto;

import lombok.Data;

@Data
public class ClientDTO {
    private Long id;
    private String nom;
    private String email;
    private String telephone;
    private int nombreReclamations;
}