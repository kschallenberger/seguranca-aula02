package br.com.cwi.segurancaaula01.controller.response;

import lombok.*;

import java.time.LocalDateTime;

@Builder @AllArgsConstructor
@NoArgsConstructor @Getter @Setter
public class DetalhesUsuarioResponse {

    private String nome;
    private String email;
    private String telefone;
    private String foto;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

}
