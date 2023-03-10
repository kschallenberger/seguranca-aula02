package br.com.cwi.segurancaaula01.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.GenerationType.IDENTITY;

@Builder @AllArgsConstructor
@NoArgsConstructor @Getter @Setter @EqualsAndHashCode(of = "id") @ToString(of = "id")
@Entity
public class RecuperacaoSenha {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private LocalDateTime dataSolicitacao;
    private boolean ativo;
    private String hashRecuperacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
