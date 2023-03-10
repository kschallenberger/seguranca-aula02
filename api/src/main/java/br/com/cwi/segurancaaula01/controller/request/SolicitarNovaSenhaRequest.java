package br.com.cwi.segurancaaula01.controller.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @Setter
public class SolicitarNovaSenhaRequest {

    @Email
    @NotBlank
    @Size(max = 255)
    private String email;

}
