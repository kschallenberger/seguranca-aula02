package br.com.cwi.segurancaaula01.service;

import br.com.cwi.segurancaaula01.controller.request.AlterarUsuarioRequest;
import br.com.cwi.segurancaaula01.domain.Usuario;
import br.com.cwi.segurancaaula01.repository.UsuarioRepository;
import br.com.cwi.segurancaaula01.security.service.UsuarioAutenticadoService;
import br.com.cwi.segurancaaula01.service.core.SenhaCriptografadaService;
import br.com.cwi.segurancaaula01.validator.AlterarUsuarioValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static br.com.cwi.segurancaaula01.mapper.AlterarUsuarioMapper.toEntity;

@Service
public class AlterarUsuarioService {

    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;
    @Autowired
    private AlterarUsuarioValidator alterarUsuarioValidator;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private SenhaCriptografadaService senhaCriptografadaService;

    public void alterar(AlterarUsuarioRequest request) {
        alterarUsuarioValidator.validar(request);
        Usuario usuario = usuarioAutenticadoService.get();

        String senhaCriptografada = usuario.getSenha();
        if (!request.getSenha().isEmpty()) {
            senhaCriptografada = senhaCriptografadaService.getSenhaCriptografada(request.getSenha());
        }

        Usuario usuarioAlterado = toEntity(usuario, request, senhaCriptografada);

        usuarioRepository.save(usuarioAlterado);
    }
}
