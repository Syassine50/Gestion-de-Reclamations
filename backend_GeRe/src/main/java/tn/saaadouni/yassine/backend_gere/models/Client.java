package tn.saaadouni.yassine.backend_gere.models;

import jakarta.persistence.*;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nom;
    @Column
    private String email;
    @Column
    private String telephone;

    @OneToMany(mappedBy = "client")
    private List<Reclamation> listerec = new ArrayList<Reclamation>();
    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    // getters et setters
}