package tn.saaadouni.yassine.backend_gere.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.saaadouni.yassine.backend_gere.dto.ClientDTO;
import tn.saaadouni.yassine.backend_gere.mapper.ClientMapper;
import tn.saaadouni.yassine.backend_gere.services.ClientService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin("*")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientMapper clientMapper;

    @PostMapping
    public ResponseEntity<ClientDTO> createClient(@RequestBody ClientDTO clientDTO) {
        return ResponseEntity.ok(
            clientMapper.toDto(
                clientService.saveClient(
                    clientMapper.toEntity(clientDTO)
                )
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(@PathVariable Long id, @RequestBody ClientDTO clientDTO) {
        clientDTO.setId(id);
        return ResponseEntity.ok(
            clientMapper.toDto(
                clientService.updateClient(
                    clientMapper.toEntity(clientDTO)
                )
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClient(@PathVariable Long id) {
        return ResponseEntity.ok(
            clientMapper.toDto(
                clientService.getClientById(id)
            )
        );
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        return ResponseEntity.ok(
            clientService.getAllClients().stream()
                .map(clientMapper::toDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ClientDTO> getClientByEmail(@PathVariable String email) {
        return ResponseEntity.ok(
            clientMapper.toDto(
                clientService.getClientByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Client not found with email: " + email))
            )
        );
    }

    @GetMapping("/telephone/{telephone}")
    public ResponseEntity<ClientDTO> getClientByTelephone(@PathVariable String telephone) {
        return ResponseEntity.ok(
            clientMapper.toDto(
                clientService.getClientByTelephone(telephone)
                    .orElseThrow(() -> new RuntimeException("Client not found with telephone: " + telephone))
            )
        );
    }
}