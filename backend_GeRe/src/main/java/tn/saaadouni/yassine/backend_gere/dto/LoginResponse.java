package tn.saaadouni.yassine.backend_gere.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.catalina.User;
import tn.saaadouni.yassine.backend_gere.models.AppUser;

@Builder
@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private UserDto user;

}
