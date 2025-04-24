package tn.saaadouni.yassine.backend_gere.models;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
public class SuiviReclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String message;
    @Column
    private String action;
    @Column
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name="idReclamation")
    private Reclamation reclamation;

    @ManyToOne
    @JoinColumn(name="idAgentSAV")
    private AgentSAV employe;

    // getters et setters

}