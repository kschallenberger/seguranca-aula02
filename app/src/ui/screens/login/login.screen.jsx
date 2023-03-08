import { Botao, Header, Input } from "../../components";
import { useControleFormulario } from "../../../hooks/login/use-controle-formulario-login.hook";
import useGlobalUser from "../../../context/user/user.contex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./login.style.css";

export function Login() {
  const [user, setUser] = useGlobalUser();
  const { formInputsLogin, handleChangeInput, handleSubmit } =
    useControleFormulario();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <main className="login__">
      <section className="login__section">
        <Header/>
        <div className="login__div--titulo">
          <h1>Login</h1>
        </div>
        <form className="login__form" onSubmit={(event) => handleSubmit(event)}>
          <Input
            titulo="Usuário"
            name="usuario"
            valor={formInputsLogin.usuario.valor}
            erro={formInputsLogin.usuario.erro}
            onChange={handleChangeInput}
          />
          <Input
            titulo="Senha"
            tipo="password"
            name="senha"
            valor={formInputsLogin.senha.valor}
            erro={formInputsLogin.senha.erro}
            onChange={handleChangeInput}
          />
          <p className="erro">{formInputsLogin.erroLogin}</p>
          <Botao titulo="Confirmar" />
        </form>
      </section>
    </main>
  );
}
