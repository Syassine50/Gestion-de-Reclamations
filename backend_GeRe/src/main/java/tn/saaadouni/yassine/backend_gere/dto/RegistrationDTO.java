package tn.saaadouni.yassine.backend_gere.dto;

import lombok.Data;
import tn.saaadouni.yassine.backend_gere.models.Role;

@Data
public class RegistrationDTO {
    private String username;
    private String password;
    private Role role;
    private String nom;
    private String email;      // For clients
    private String telephone;  // For clients
    private String competence; // For agents
}
