package tn.saaadouni.yassine.backend_gere.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private AgentSAV agent;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Client client;
}
