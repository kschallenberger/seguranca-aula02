package br.com.cwi.segurancaaula01.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Funcao {

    USER(Nomes.USER),
    ADMIN(Nomes.ADMIN);

    public static class Nomes {
        public static final String USER = "ROLE_USER";
        public static final String ADMIN = "ROLE_ADMIN";
    }

    private final String role;
}
