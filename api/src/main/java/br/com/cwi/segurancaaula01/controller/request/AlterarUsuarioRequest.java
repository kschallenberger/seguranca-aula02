package br.com.cwi.segurancaaula01.controller.request;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @Setter
public class AlterarUsuarioRequest {

    @NotBlank
    @Size(min = 5, max = 255)
    private String nome;

    @Size(max = 128)
    private String senha;

    @NotBlank
    @Size(max = 14)
    private String telefone;

    @URL
    @Size(max = 512)
    private String foto;

}
