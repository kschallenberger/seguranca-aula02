package br.com.cwi.segurancaaula01.mapper;

import br.com.cwi.segurancaaula01.controller.response.DetalhesUsuarioResponse;
import br.com.cwi.segurancaaula01.domain.Usuario;

public class DetalhesUsuarioMapper {
    public static DetalhesUsuarioResponse toResponse(Usuario entity) {
        return DetalhesUsuarioResponse.builder()
                .nome(entity.getNome())
                .email(entity.getEmail())
                .telefone(entity.getTelefone())
                .foto(entity.getFoto())
                .criadoEm(entity.getCriadoEm())
                .atualizadoEm(entity.getAtualizadoEm())
                .build();
    }
}
