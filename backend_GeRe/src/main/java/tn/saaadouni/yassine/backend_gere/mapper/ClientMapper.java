package tn.saaadouni.yassine.backend_gere.mapper;

import org.springframework.stereotype.Component;
import tn.saaadouni.yassine.backend_gere.dto.ClientDTO;
import tn.saaadouni.yassine.backend_gere.models.Client;

@Component
public class ClientMapper {
    
    public ClientDTO toDto(Client client) {
        if (client == null) {
            return null;
        }

        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setNom(client.getNom());
        dto.setEmail(client.getEmail());
        dto.setTelephone(client.getTelephone());
        dto.setNombreReclamations(client.getListerec() != null ? client.getListerec().size() : 0);
        
        return dto;
    }

    public Client toEntity(ClientDTO dto) {
        if (dto == null) {
            return null;
        }

        Client client = new Client();
        client.setId(dto.getId());
        client.setNom(dto.getNom());
        client.setEmail(dto.getEmail());
        client.setTelephone(dto.getTelephone());
        
        return client;
    }
}