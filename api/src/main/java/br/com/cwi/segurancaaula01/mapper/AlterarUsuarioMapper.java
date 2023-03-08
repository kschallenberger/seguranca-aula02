package br.com.cwi.segurancaaula01.mapper;

import br.com.cwi.segurancaaula01.controller.request.AlterarUsuarioRequest;
import br.com.cwi.segurancaaula01.domain.Usuario;

import java.time.LocalDateTime;

public class AlterarUsuarioMapper {
    public static Usuario toEntity(Usuario usuario, AlterarUsuarioRequest request, String novaSenha) {
        return Usuario.builder()
                .id(usuario.getId())
                .nome(request.getNome())
                .email(usuario.getEmail())
                .senha(novaSenha)
                .telefone(request.getTelefone())
                .foto(request.getFoto())
                .criadoEm(usuario.getCriadoEm())
                .atualizadoEm(LocalDateTime.now())
                .ativo(usuario.isAtivo())
                .permissoes(usuario.getPermissoes())
                .build();
    }
}
