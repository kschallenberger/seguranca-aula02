package br.com.cwi.segurancaaula01.controller.response;

import lombok.*;

@Builder @AllArgsConstructor
@NoArgsConstructor @Getter @Setter
public class ListarUsuarioResponse {

    private Long id;
    private String nome;
    private String telefone;
    private String foto;

}
