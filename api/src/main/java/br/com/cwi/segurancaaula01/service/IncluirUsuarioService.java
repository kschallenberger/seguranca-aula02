package br.com.cwi.segurancaaula01.service;

import br.com.cwi.segurancaaula01.controller.request.UsuarioRequest;
import br.com.cwi.segurancaaula01.controller.response.UsuarioResponse;
import br.com.cwi.segurancaaula01.domain.Usuario;
import br.com.cwi.segurancaaula01.repository.UsuarioRepository;
import br.com.cwi.segurancaaula01.service.core.SenhaCriptografadaService;
import br.com.cwi.segurancaaula01.service.core.ValidaEmailUnicoService;
import br.com.cwi.segurancaaula01.validator.IncluirUsuarioValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static br.com.cwi.segurancaaula01.mapper.UsuarioMapper.toEntity;
import static br.com.cwi.segurancaaula01.mapper.UsuarioMapper.toResponse;

@Service
public class IncluirUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private IncluirUsuarioValidator incluirUsuarioValidator;
    @Autowired
    private ValidaEmailUnicoService validaEmailUnicoService;
    @Autowired
    private SenhaCriptografadaService senhaCriptografadaService;

    public UsuarioResponse incluir(UsuarioRequest request) {
        incluirUsuarioValidator.validar(request);
        validaEmailUnicoService.validar(request.getEmail());

        String senhaCriptografada = senhaCriptografadaService.getSenhaCriptografada(request.getSenha());

        Usuario usuario = toEntity(request, senhaCriptografada);

        usuarioRepository.save(usuario);

        return toResponse(usuario);
    }
}
