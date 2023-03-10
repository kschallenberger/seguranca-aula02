import { Botao, Header, Input, Carregando } from "../../components";
import useGlobalUser from "../../../context/user/user.contex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./esqueci-senha.style.css";
import { useControleFormularioSolicitarSenha } from "../../../hooks";

export function EsqueciSenha() {
  const [user, setUser] = useGlobalUser();
  const { formInputsSolicitarSenha, carregando, handleChangeInput, handleSubmit } =
    useControleFormularioSolicitarSenha();
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
          <h1>Solicitar redefinição de senha</h1>
        </div>
        <form
          className="esqueci-senha__form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <Input
            titulo="Usuário"
            name="usuario"
            valor={formInputsSolicitarSenha.usuario.valor}
            erro={formInputsSolicitarSenha.usuario.erro}
            onChange={handleChangeInput}
          />
          <p className="erro">{formInputsSolicitarSenha.erroSolicitarSenha}</p>
          <Botao titulo="Solicitar" />
        </form>
        {carregando ? <Carregando /> : null}
      </section>
    </main>
  );
}
