package br.com.cwi.segurancaaula01.service.core;

import br.com.cwi.segurancaaula01.domain.Usuario;
import br.com.cwi.segurancaaula01.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class BuscaUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario porId(Long idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Usuário não encontrado"));
    }

    public Usuario porEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Usuário não encontrado"));
    }
}
