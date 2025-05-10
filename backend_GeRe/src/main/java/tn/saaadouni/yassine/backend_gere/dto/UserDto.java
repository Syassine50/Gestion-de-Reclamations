package tn.saaadouni.yassine.backend_gere.dto;

import lombok.Builder;
import lombok.Data;
import tn.saaadouni.yassine.backend_gere.models.AppUser;

@Data
@Builder
public class UserDto {
    private long id;
    private String username;
    public static  UserDto fromUser(AppUser user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }
}
