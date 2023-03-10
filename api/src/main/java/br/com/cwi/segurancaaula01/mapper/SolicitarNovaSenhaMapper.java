package br.com.cwi.segurancaaula01.mapper;

import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;
import br.com.cwi.segurancaaula01.domain.Usuario;

import java.time.LocalDateTime;

public class SolicitarNovaSenhaMapper {
    public static RecuperacaoSenha toEntity(Usuario usuario, String hashRecuperacao) {
        return RecuperacaoSenha.builder()
                .usuario(usuario)
                .dataSolicitacao(LocalDateTime.now())
                .ativo(true)
                .hashRecuperacao(hashRecuperacao)
                .build();
    }
}
