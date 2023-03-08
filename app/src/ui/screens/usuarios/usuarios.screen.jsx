import { Botao, Header } from "../../components";
import "./usuarios.style.css";
import { useObterListaUsuarios } from "../../../hooks";
import imgUsuario from "../../../assets/image/img-usuario.png";
import useGlobalUser from "../../../context/user/user.contex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Usuarios() {
  const { listaUsuarios, carregando, buscarProxPaginaListaUsuarios } =
    useObterListaUsuarios();
  const [user] = useGlobalUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user])

  function renderUsuario(usuario) {
    if (usuario.id === user.id) return;
    return (
      <div className="search__div" key={usuario.id}>
        <div className="search__div--imagem">
          <img src={!usuario.foto ? imgUsuario : usuario.foto} alt="" />
        </div>
        <div className="search__div--info">
          <h1>{usuario.nome}</h1>
          <h2>{aplicaMascara(usuario.telefone)}</h2>
        </div>
      </div>
    );
  }

  function aplicaMascara(telefone) {
    if (!telefone) {
      return;
    }
    const novoValorSoNumeros = telefone.replace(/[^0-9]/g, "");
    const mascaraPrimeiraParte =
      novoValorSoNumeros.length > 2
        ? novoValorSoNumeros.replace(/(\d{2})(\d)/, "($1) $2")
        : novoValorSoNumeros;
    const mascaraSegundaParte =
      mascaraPrimeiraParte.length > 7
        ? mascaraPrimeiraParte.replace(/(\d{2})(\d)/, "($1) $2")
        : mascaraPrimeiraParte;
    const mascaraTerceiraParte =
      mascaraSegundaParte.length > 16
        ? mascaraSegundaParte.replace(/(\d{5})(\d{1,4})$/, "$1-$2")
        : mascaraSegundaParte;

    return mascaraTerceiraParte;
  }

  return (
    <section className="search__">
      <Header/>
      {!listaUsuarios?.content.length ? <h1>Não há usuários para listas</h1> : null}
      {listaUsuarios?.content.map((usuario) => renderUsuario(usuario))}
      {listaUsuarios?.number < listaUsuarios?.totalPages - 1 ? (
        <Botao
          titulo="Carregar mais"
          handleClick={buscarProxPaginaListaUsuarios}
        />
      ) : null}
    </section>
  );
}
