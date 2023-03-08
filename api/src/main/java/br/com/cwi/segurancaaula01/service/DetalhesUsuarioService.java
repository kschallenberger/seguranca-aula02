package br.com.cwi.segurancaaula01.service;

import br.com.cwi.segurancaaula01.controller.response.DetalhesUsuarioResponse;
import br.com.cwi.segurancaaula01.service.core.BuscaUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static br.com.cwi.segurancaaula01.mapper.DetalhesUsuarioMapper.toResponse;

@Service
public class DetalhesUsuarioService {

    @Autowired
    private BuscaUsuarioService buscaUsuarioService;

    public DetalhesUsuarioResponse detalhes(Long idUsuario) {
        return toResponse(buscaUsuarioService.porId(idUsuario));
    }
}
