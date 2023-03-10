import { Botao, Header, Input, Carregando } from "../../components";
import useGlobalUser from "../../../context/user/user.contex";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useControleFormularioRedefinirSenha } from "../../../hooks";
import "./redefinir-senha.style.css";

export function RedefinirSenha() {
  const [user, setUser] = useGlobalUser();
  const { hash } = useParams();
  const { formInputsRedefinirSenha, carregando, handleChangeInput, handleSubmit } =
    useControleFormularioRedefinirSenha(hash);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <main className="esqueci-senha__">
      <section className="esqueci-senha__section">
        <Header />

        <div className="esqueci-senha__div--titulo">
          <h1>Redefinir senha</h1>
        </div>
        <form
          className="esqueci-senha__form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <Input
            titulo="Senha"
            tipo="password"
            name="senha"
            valor={formInputsRedefinirSenha.senha.valor}
            erro={formInputsRedefinirSenha.senha.erro}
            onChange={handleChangeInput}
          />
          <Input
            titulo="Confirmação da senha"
            tipo="password"
            name="confirmacaoSenha"
            valor={formInputsRedefinirSenha.confirmacaoSenha.valor}
            erro={formInputsRedefinirSenha.confirmacaoSenha.erro}
            onChange={handleChangeInput}
          />
          <p className="erro">{formInputsRedefinirSenha.erroRedefinirSenha}</p>
          <Botao titulo="Redefinir" />
        </form>
        {carregando ? <Carregando /> : null}
      </section>
    </main>
  );
}
