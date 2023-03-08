import { Botao, Header, Input } from "../../components";
import { useControleFormularioCadastro } from "../../../hooks";
import useGlobalUser from "../../../context/user/user.contex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./cadastro.style.css";

export function Cadastro() {
  const [user, setUser] = useGlobalUser();
  const { formInputsCadastro, handleChangeInput, handleSubmit } =
    useControleFormularioCadastro();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <main className="cadastro__">
      <section className="cadastro__section">
        <Header />
        <div className="cadastro__div--titulo">
          <h1>Cadastro</h1>
        </div>
        <form
          className="cadastro__form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="cadastro__form--div">
            <img
              src={
                formInputsCadastro.foto.valor
                  ? formInputsCadastro.foto.valor
                  : "https://static.vecteezy.com/ti/vetor-gratis/p1/1840618-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-gratis-vetor.jpg"
              }
              alt=""
            />

            <div className="cadastro__form--dados-pessoais">
              <Input
                titulo="Foto"
                name="foto"
                valor={formInputsCadastro.foto.valor}
                erro={formInputsCadastro.foto.erro}
                onChange={handleChangeInput}
              />
              <Input
                titulo="Nome"
                name="nome"
                valor={formInputsCadastro.nome.valor}
                erro={formInputsCadastro.nome.erro}
                onChange={handleChangeInput}
              />

              <Input
                titulo="Telefone"
                name="telefone"
                valor={formInputsCadastro.telefone.valor}
                erro={formInputsCadastro.telefone.erro}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <Input
            titulo="E-mail"
            name="email"
            valor={formInputsCadastro.email.valor}
            erro={formInputsCadastro.email.erro}
            onChange={handleChangeInput}
          />
          <Input
            titulo="Senha"
            tipo="password"
            name="senha"
            valor={formInputsCadastro.senha.valor}
            erro={formInputsCadastro.senha.erro}
            onChange={handleChangeInput}
          />
          <Input
            titulo="Confirmação da senha"
            tipo="password"
            name="confirmacaoSenha"
            valor={formInputsCadastro.confirmacaoSenha.valor}
            erro={formInputsCadastro.confirmacaoSenha.erro}
            onChange={handleChangeInput}
          />
          <p className="erro">{formInputsCadastro.erroCadastro}</p>
          <Botao titulo="Confirmar" />
        </form>
      </section>
    </main>
  );
}
