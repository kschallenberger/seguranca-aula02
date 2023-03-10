package br.com.cwi.segurancaaula01.controller;

import br.com.cwi.segurancaaula01.controller.request.AlterarUsuarioRequest;
import br.com.cwi.segurancaaula01.controller.request.RedefinirSenhaRequest;
import br.com.cwi.segurancaaula01.controller.request.SolicitarNovaSenhaRequest;
import br.com.cwi.segurancaaula01.controller.request.UsuarioRequest;
import br.com.cwi.segurancaaula01.controller.response.DetalhesUsuarioResponse;
import br.com.cwi.segurancaaula01.controller.response.ListarUsuarioResponse;
import br.com.cwi.segurancaaula01.controller.response.UsuarioResponse;
import br.com.cwi.segurancaaula01.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IncluirUsuarioService incluirUsuarioService;
    @Autowired
    private DetalhesUsuarioService detalhesUsuarioService;
    @Autowired
    private ListarUsuarioService listarUsuarioService;
    @Autowired
    private AlterarUsuarioService alterarUsuarioService;
    @Autowired
    private SolicitarNovaSenhaService solicitarNovaSenhaService;
    @Autowired
    private RedefinirSenhaService redefinirSenhaService;

    @PostMapping
    public UsuarioResponse incluir(@Valid @RequestBody UsuarioRequest request) {
        return incluirUsuarioService.incluir(request);
    }

    @PutMapping
    public void alterar(@Valid @RequestBody AlterarUsuarioRequest request) {
        alterarUsuarioService.alterar(request);
    }

    @GetMapping("/{idUsuario}")
    public DetalhesUsuarioResponse detalhes(@PathVariable Long idUsuario) {
        return detalhesUsuarioService.detalhes(idUsuario);
    }

    @GetMapping
    public Page<ListarUsuarioResponse> listarUsuarios(@RequestParam(required = false, defaultValue = "") String search, Pageable pageable) {
        return listarUsuarioService.listar(search, pageable);
    }

    @PostMapping("/redefinir-senha")
    @ResponseStatus(CREATED)
    public void solicitarNovaSenha(@Valid @RequestBody SolicitarNovaSenhaRequest request) {
        solicitarNovaSenhaService.solicitar(request);
    }

    @PutMapping("/redefinir-senha")
    public void redefinirSenha(@Valid @RequestBody RedefinirSenhaRequest request) {
        redefinirSenhaService.redefinir(request);
    }
}