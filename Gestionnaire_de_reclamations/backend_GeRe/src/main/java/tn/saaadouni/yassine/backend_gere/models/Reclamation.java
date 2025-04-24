package tn.saaadouni.yassine.backend_gere.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Data
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column
    private String produit;

    @Column
    private String statut;
    @Column
    private String description;
    @Column
    private LocalDate date;
    @Column
    private int note;



    @ManyToOne
    @JoinColumn(name="idClient")
    private Client client;
    @ManyToOne()
    @JoinColumn(name="idAgent")
    private AgentSAV agent;
    @OneToMany(mappedBy = "reclamation")
    private List<SuiviReclamation> listeSuivi = new ArrayList<SuiviReclamation>();



}