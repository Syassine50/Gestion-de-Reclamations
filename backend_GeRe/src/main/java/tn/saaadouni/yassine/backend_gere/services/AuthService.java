package tn.saaadouni.yassine.backend_gere.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.saaadouni.yassine.backend_gere.dto.LoginDTO;
import tn.saaadouni.yassine.backend_gere.dto.LoginResponse;
import tn.saaadouni.yassine.backend_gere.dto.RegistrationDTO;
import tn.saaadouni.yassine.backend_gere.dto.UserDto;
import tn.saaadouni.yassine.backend_gere.models.*;
import tn.saaadouni.yassine.backend_gere.repositories.AgentSAVRepository;
import tn.saaadouni.yassine.backend_gere.repositories.AppUserRepository;
import tn.saaadouni.yassine.backend_gere.repositories.ClientRepository;
import tn.saaadouni.yassine.backend_gere.Security.JwtUtil;

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

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<LoginResponse> login(LoginDTO request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            var user = appUserRepository.findByUsername(request.getUsername())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);

            return ResponseEntity.ok(LoginResponse.builder().user(UserDto.fromUser(user)).token(jwtToken).build());
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }

}
