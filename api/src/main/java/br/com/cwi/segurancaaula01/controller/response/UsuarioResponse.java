package br.com.cwi.segurancaaula01.controller.response;

import lombok.*;

@Builder @AllArgsConstructor
@NoArgsConstructor @Getter @Setter
public class UsuarioResponse {

    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String foto;

}
