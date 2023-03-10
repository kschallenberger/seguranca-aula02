package br.com.cwi.segurancaaula01.mapper;

import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;

import java.time.LocalDateTime;

public class RedefinirSenhaMapper {

    public static RecuperacaoSenha toEntity(String novaSenhaCriptografada, RecuperacaoSenha recuperacaoSenha) {
        RecuperacaoSenha recuperacaoSenhaAtualizado = RecuperacaoSenha.builder()
                .id(recuperacaoSenha.getId())
                .dataSolicitacao(recuperacaoSenha.getDataSolicitacao())
                .ativo(false)
                .hashRecuperacao(recuperacaoSenha.getHashRecuperacao())
                .usuario(recuperacaoSenha.getUsuario())
                .build();
        recuperacaoSenhaAtualizado.getUsuario().setSenha(novaSenhaCriptografada);
        recuperacaoSenhaAtualizado.getUsuario().setAtualizadoEm(LocalDateTime.now());

        return recuperacaoSenhaAtualizado;
    }
}
