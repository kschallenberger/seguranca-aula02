package br.com.cwi.segurancaaula01.service;

import br.com.cwi.segurancaaula01.controller.request.RedefinirSenhaRequest;
import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;
import br.com.cwi.segurancaaula01.mapper.RedefinirSenhaMapper;
import br.com.cwi.segurancaaula01.repository.RecuperacaoSenhaRepository;
import br.com.cwi.segurancaaula01.service.core.SenhaCriptografadaService;
import br.com.cwi.segurancaaula01.validator.RedefinirSenhaValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RedefinirSenhaService {

    @Autowired
    private RecuperacaoSenhaRepository recuperacaoSenhaRepository;
    @Autowired
    private RedefinirSenhaValidator redefinirSenhaValidator;
    @Autowired
    private SenhaCriptografadaService senhaCriptografadaService;

    @Transactional
    public void redefinir(RedefinirSenhaRequest request) {
        RecuperacaoSenha recuperacaoSenha = recuperacaoSenhaRepository
                .findByHashRecuperacaoAndAtivo(request.getHashRecuperacao(), true);

        redefinirSenhaValidator.validar(recuperacaoSenha);

        String senhaCriptografada = senhaCriptografadaService.getSenhaCriptografada(request.getNovaSenha());
        RecuperacaoSenha recuperacaoSenhaAlterada = RedefinirSenhaMapper.toEntity(senhaCriptografada, recuperacaoSenha);

        recuperacaoSenhaRepository.save(recuperacaoSenhaAlterada);
    }
}
