package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.dto.LoginDTO;
import tn.saaadouni.yassine.backend_gere.dto.LoginResponse;
import tn.saaadouni.yassine.backend_gere.dto.RegistrationDTO;
import tn.saaadouni.yassine.backend_gere.models.*;
import  tn.saaadouni.yassine.backend_gere.Config.*;
import tn.saaadouni.yassine.backend_gere.repositories.AppUserRepository;
import tn.saaadouni.yassine.backend_gere.services.AgentSAVService;
import tn.saaadouni.yassine.backend_gere.services.ClientService;
import tn.saaadouni.yassine.backend_gere.services.AuthService;

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
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegistrationDTO request) {
        authService.register(request);
        return "User registered successfully as " + request.getRole();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO request) {
        return authService.login(request);
    }


}
