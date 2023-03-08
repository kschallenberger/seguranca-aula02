import { Botao, Header, Input } from "../../components";
import { useControleFormularioEditarUsuario } from "../../../hooks";
import "./editar-usuario.style.css";
import useGlobalUser from "../../../context/user/user.contex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function EditarUsuario() {
  const [user] = useGlobalUser();
  const { formInputsEditarUsuario, handleChangeInput, handleSubmit } =
    useControleFormularioEditarUsuario();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <main className="editar-usuario__">
      <Header />
      <section className="editar-usuario__section">
        <div className="editar-usuario__div--titulo">
          <h1>Editar usuário</h1>
        </div>
        <form
          className="editar-usuario__form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="editar-usuario__form--div">
            <img
              src={
                formInputsEditarUsuario.foto.valor
                  ? formInputsEditarUsuario.foto.valor
                  : "https://static.vecteezy.com/ti/vetor-gratis/p1/1840618-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-gratis-vetor.jpg"
              }
              alt=""
            />
            <div className="editar-usuario__form--dados-pessoais">
              <Input
                titulo="Foto"
                name="foto"
                valor={formInputsEditarUsuario.foto.valor}
                erro={formInputsEditarUsuario.foto.erro}
                onChange={handleChangeInput}
              />
              <Input
                titulo="Nome"
                name="nome"
                valor={formInputsEditarUsuario.nome.valor}
                erro={formInputsEditarUsuario.nome.erro}
                onChange={handleChangeInput}
              />

              <Input
                titulo="Telefone"
                name="telefone"
                valor={formInputsEditarUsuario.telefone.valor}
                erro={formInputsEditarUsuario.telefone.erro}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <Input
            titulo="Nova senha"
            tipo="password"
            name="senha"
            valor={formInputsEditarUsuario.senha.valor}
            erro={formInputsEditarUsuario.senha.erro}
            onChange={handleChangeInput}
          />
          <Input
            titulo="Confirmação da senha"
            tipo="password"
            name="confirmacaoSenha"
            valor={formInputsEditarUsuario.confirmacaoSenha.valor}
            erro={formInputsEditarUsuario.confirmacaoSenha.erro}
            onChange={handleChangeInput}
          />
          <p className="erro">{formInputsEditarUsuario.erroCadastro}</p>
          <Botao titulo="Confirmar" />
        </form>
      </section>
    </main>
  );
}
