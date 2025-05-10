package tn.saaadouni.yassine.backend_gere.models;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class AgentSAV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nom;
    @Column
    private String competence;


    @OneToMany(mappedBy = "agent")
    private List<Reclamation> listeReclamation= new ArrayList<Reclamation>();

    @OneToMany(mappedBy = "employe")
    private List<SuiviReclamation> listeSuivi = new ArrayList<SuiviReclamation>();
    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

}