package br.com.cwi.segurancaaula01.service.core;

import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;
import br.com.cwi.segurancaaula01.domain.Usuario;
import br.com.cwi.segurancaaula01.repository.RecuperacaoSenhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
public class ValidaSolicitarNovaSenhaService {

    private final static long HORAS_VALIDADE = 1;

    @Autowired
    private RecuperacaoSenhaRepository recuperacaoSenhaRepository;

    public void validar(Usuario usuario) {
        LocalDateTime dataMaxima = LocalDateTime.now().minusHours(HORAS_VALIDADE);
        List<RecuperacaoSenha> solicitacoes = recuperacaoSenhaRepository
                .findAllByUsuarioAndAtivoAndDataSolicitacaoGreaterThan(usuario, true, dataMaxima);

        if (solicitacoes.isEmpty()) {
            return;
        }

        List<RecuperacaoSenha> solicitacoesNoPrazo = solicitacoes.stream()
                .filter(solic -> solic.getDataSolicitacao().plusHours(HORAS_VALIDADE).isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());

        if (!solicitacoesNoPrazo.isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, "Já existe uma solicitação de recuperação de senha!");
        }
    }
}
