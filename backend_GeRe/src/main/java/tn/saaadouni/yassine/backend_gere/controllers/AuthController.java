package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.dto.RegistrationDTO;
import tn.saaadouni.yassine.backend_gere.models.*;
import  tn.saaadouni.yassine.backend_gere.Config.*;
import tn.saaadouni.yassine.backend_gere.repositories.AppUserRepository;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;
import tn.saaadouni.yassine.backend_gere.services.ClientService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ClientService clientService;

    @Autowired
    private AgentSAVService agentSAVService;

    @PostMapping("/register")
    public String register(@RequestBody RegistrationDTO request) {
        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        appUserRepository.save(user);

        if (request.getRole() == Role.ROLE_AGENT) {
            AgentSAV agent = new AgentSAV();
            agent.setNom(request.getNom());
            agent.setCompetence(request.getCompetence());
            agent.setUser(user);
            agentSAVService.saveAgent(agent);
        } else if (request.getRole() == Role.ROLE_CLIENT) {
            Client client = new Client();
            client.setNom(request.getNom());
            client.setEmail(request.getEmail());
            client.setTelephone(request.getTelephone());
            client.setUser(user);
            clientService.saveClient(client);
        }

        return "User registered successfully as " + request.getRole();
    }
}
