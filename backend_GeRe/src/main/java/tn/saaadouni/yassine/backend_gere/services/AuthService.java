package tn.saaadouni.yassine.backend_gere.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.saaadouni.yassine.backend_gere.dto.RegistrationDTO;
import tn.saaadouni.yassine.backend_gere.models.*;
import tn.saaadouni.yassine.backend_gere.repositories.AgentSAVRepository;
import tn.saaadouni.yassine.backend_gere.repositories.AppUserRepository;
import tn.saaadouni.yassine.backend_gere.repositories.ClientRepository;

@Service
public class AuthService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private AgentSAVRepository agentRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void register(RegistrationDTO request) {
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
            agentRepository.save(agent);
        } else if (request.getRole() == Role.ROLE_CLIENT) {
            Client client = new Client();
            client.setNom(request.getNom());
            client.setEmail(request.getEmail());
            client.setTelephone(request.getTelephone());
            client.setUser(user);
            clientRepository.save(client);
        }
    }
}
