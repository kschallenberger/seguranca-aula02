package br.com.cwi.segurancaaula01.service;

import br.com.cwi.segurancaaula01.controller.response.ListarUsuarioResponse;
import br.com.cwi.segurancaaula01.domain.Usuario;
import br.com.cwi.segurancaaula01.mapper.ListarUsuarioMapper;
import br.com.cwi.segurancaaula01.repository.UsuarioRepository;
import br.com.cwi.segurancaaula01.security.service.UsuarioAutenticadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ListarUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;

    public Page<ListarUsuarioResponse> listar(String search, Pageable pageable) {
        Usuario usuarioLogado = usuarioAutenticadoService.get();
        return usuarioRepository.findAllByAtivoAndNomeContainingIgnoreCaseOrAtivoAndEmailContainingIgnoreCase
                        (true, search, true, search, pageable)
                .map(ListarUsuarioMapper::toResponse);
    }
}
