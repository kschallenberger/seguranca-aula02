package br.com.cwi.segurancaaula01.mapper;

import br.com.cwi.segurancaaula01.controller.request.UsuarioRequest;
import br.com.cwi.segurancaaula01.controller.response.UsuarioResponse;
import br.com.cwi.segurancaaula01.domain.Permissao;
import br.com.cwi.segurancaaula01.domain.Usuario;

import java.time.LocalDateTime;

import static br.com.cwi.segurancaaula01.domain.Funcao.USER;

public class UsuarioMapper {

    public static Usuario toEntity(UsuarioRequest request, String senhaCriptografada) {
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(senhaCriptografada);
        usuario.setTelefone(request.getTelefone());
        usuario.setFoto(request.getFoto());
        usuario.setCriadoEm(LocalDateTime.now());
        usuario.setAtivo(true);
        usuario.adicionarPermissao(getPermissaoPadrao());
        return usuario;
    }

    public static UsuarioResponse toResponse(Usuario entity) {
        return UsuarioResponse.builder()
                .id(entity.getId())
                .nome(entity.getNome())
                .email(entity.getEmail())
                .telefone(entity.getTelefone())
                .foto(entity.getFoto())
                .build();
    }

    private static Permissao getPermissaoPadrao() {
        Permissao permissao = new Permissao();
        permissao.setFuncao(USER);
        return permissao;
    }
}