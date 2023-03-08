package br.com.cwi.segurancaaula01.mapper;

import br.com.cwi.segurancaaula01.controller.response.ListarUsuarioResponse;
import br.com.cwi.segurancaaula01.domain.Usuario;

public class ListarUsuarioMapper {

    public static ListarUsuarioResponse toResponse(Usuario entity) {
        return ListarUsuarioResponse.builder()
                .id(entity.getId())
                .nome(entity.getNome())
                .telefone(entity.getTelefone())
                .foto(entity.getFoto())
                .build();
    }
}
