package br.com.cwi.segurancaaula01.repository;

import br.com.cwi.segurancaaula01.domain.RecuperacaoSenha;
import br.com.cwi.segurancaaula01.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RecuperacaoSenhaRepository extends JpaRepository<RecuperacaoSenha, Long> {

    List<RecuperacaoSenha> findAllByUsuarioAndAtivoAndDataSolicitacaoGreaterThan(Usuario usuario, boolean ativo, LocalDateTime dataMaxima);

    RecuperacaoSenha findByHashRecuperacaoAndAtivo(String hashRecuperacao, boolean ativo);
}
