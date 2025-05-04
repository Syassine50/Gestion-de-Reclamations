package tn.saaadouni.yassine.backend_gere.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.saaadouni.yassine.backend_gere.models.Client;
import tn.saaadouni.yassine.backend_gere.repositories.ClientRepository;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@Transactional
public class ClientService {

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final String PHONE_REGEX = "^\\d{8}$";

    @Autowired
    private ClientRepository clientRepository;

    public Client saveClient(Client client) {
        validateClient(client);
        // Vérifier si l'email ou le téléphone existe déjà
        if (clientRepository.findByEmail(client.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Un client avec cet email existe déjà");
        }
        if (clientRepository.findByTelephone(client.getTelephone()).isPresent()) {
            throw new IllegalArgumentException("Un client avec ce numéro de téléphone existe déjà");
        }
        return clientRepository.save(client);
    }

    public Client updateClient(Client client) {
        validateClient(client);
        Client existingClient = getClientById(client.getId());
        
        // Vérifier les doublons d'email et de téléphone sauf pour le client actuel
        Optional<Client> clientWithEmail = clientRepository.findByEmail(client.getEmail());
        if (clientWithEmail.isPresent() && !clientWithEmail.get().getId().equals(client.getId())) {
            throw new IllegalArgumentException("Un client avec cet email existe déjà");
        }
        
        Optional<Client> clientWithPhone = clientRepository.findByTelephone(client.getTelephone());
        if (clientWithPhone.isPresent() && !clientWithPhone.get().getId().equals(client.getId())) {
            throw new IllegalArgumentException("Un client avec ce numéro de téléphone existe déjà");
        }
        
        return clientRepository.save(client);
    }

    public void deleteClient(Long id) {
        Client client = getClientById(id);
        if (!client.getListerec().isEmpty()) {
            throw new IllegalStateException("Impossible de supprimer un client ayant des réclamations");
        }
        clientRepository.deleteById(id);
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public Optional<Client> getClientByTelephone(String telephone) {
        return clientRepository.findByTelephone(telephone);
    }

    // Méthodes utilitaires privées
    private void validateClient(Client client) {
        if (client == null) {
            throw new IllegalArgumentException("Le client ne peut pas être null");
        }
        if (client.getNom() == null || client.getNom().trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom est obligatoire");
        }
        if (client.getEmail() == null || !Pattern.matches(EMAIL_REGEX, client.getEmail())) {
            throw new IllegalArgumentException("L'email est invalide");
        }
        if (client.getTelephone() == null || !Pattern.matches(PHONE_REGEX, client.getTelephone())) {
            throw new IllegalArgumentException("Le numéro de téléphone doit contenir 8 chiffres");
        }
    }
}