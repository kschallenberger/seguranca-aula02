package br.com.cwi.segurancaaula01.validator;

import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Objects;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Component
public class RedefinirSenhaValidator {

    private final static long HORAS_VALIDADE = 1;

    public void validar(RecuperacaoSenha recuperacaoSenha) {
        if (Objects.isNull(recuperacaoSenha)) {
            throw new ResponseStatusException(NOT_FOUND, "Não foi encontrada solicitação para redefinição de senha!");
        }
        if (recuperacaoSenha.getDataSolicitacao().plusHours(HORAS_VALIDADE).isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(BAD_REQUEST, "Solicitação para redefinição de senha expirada");
        }
    }
}
