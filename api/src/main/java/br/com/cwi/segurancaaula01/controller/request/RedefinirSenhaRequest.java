package br.com.cwi.segurancaaula01.controller.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @Setter
public class RedefinirSenhaRequest {

    @NotBlank
    @Size(max = 128)
    private String hashRecuperacao;
    @NotBlank
    @Size(min = 6, max = 128)
    private String novaSenha;

}
