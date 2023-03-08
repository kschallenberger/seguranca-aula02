package br.com.cwi.segurancaaula01.service.core;

import br.com.cwi.segurancaaula01.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
public class ValidaEmailUnicoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void validar(String email) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new ResponseStatusException(UNPROCESSABLE_ENTITY,
                    "Já existe outro usuário cadastrado com o e-mail informado!");
        }
    }
}
