package br.com.cwi.segurancaaula01.service;

import br.com.cwi.segurancaaula01.controller.request.SolicitarNovaSenhaRequest;
import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;
import br.com.cwi.segurancaaula01.domain.Usuario;
import br.com.cwi.segurancaaula01.repository.RecuperacaoSenhaRepository;
import br.com.cwi.segurancaaula01.service.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.time.LocalDateTime;

import static br.com.cwi.segurancaaula01.mapper.SolicitarNovaSenhaMapper.toEntity;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Service
public class SolicitarNovaSenhaService {

    @Autowired
    private BuscaUsuarioService buscaUsuarioService;
    @Autowired
    private ValidaSolicitarNovaSenhaService validaSolicitarNovaSenhaService;
    @Autowired
    private RecuperacaoSenhaRepository recuperacaoSenhaRepository;
    @Autowired
    private SenhaCriptografadaService senhaCriptografadaService;
    @Autowired
    private EnviarEmailRecuperacaoService enviarEmailRecuperacaoService;

    @Transactional
    public void solicitar(SolicitarNovaSenhaRequest request) {
        Usuario usuario = buscaUsuarioService.porEmail(request.getEmail());
        validaSolicitarNovaSenhaService.validar(usuario);
        String hashRecuperacao = senhaCriptografadaService
                .getSenhaCriptografada(request.getEmail().concat(LocalDateTime.now().toString()));

        RecuperacaoSenha novaSolicitacao = toEntity(usuario, hashRecuperacao);

        recuperacaoSenhaRepository.save(novaSolicitacao);

        try {
            enviarEmailRecuperacaoService.enviaEmail(novaSolicitacao);
        } catch (MessagingException e) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Erro para enviar e-mail de recuperação de senha!");
        }
    }
}
