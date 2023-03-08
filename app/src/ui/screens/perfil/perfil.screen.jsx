import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useGlobalUser from "../../../context/user/user.contex";
import { useObterPostsUsuario } from "../../../hooks";
import { Botao, Comentarios, Header, Post } from "../../components";
import imgUsuario from "../../../assets/image/img-usuario.png";
import "./perfil.style.css";

export function Perfil() {
  const [user] = useGlobalUser();
  const { idUsuario } = useParams();
  const {
    postUsuario,
    dadosUsuario,
    carregando,
    buscarProxPaginaPostsUsuario,
  } = useObterPostsUsuario(idUsuario);
  const navigate = useNavigate();

  function renderDadosAmigo() {
    if (user.id === parseInt(idUsuario)) {
      return (
        <>
          <Link to="/editar-usuario">
            <div className="perfil__dados-usuario--editar"></div>
          </Link>
          <Botao titulo="Ver amigos" handleClick={() => navigate("/amigos")} />
        </>
      );
    }
  }

  return (
    <section className="perfil__">
      <Header />

      <div className="perfil__dados-usuario">
        <div className="perfil__dados-usuario--img">
          <img
            src={dadosUsuario?.imagem ? dadosUsuario?.imagem : imgUsuario}
            alt=""
          />
        </div>
        <div className="perfil__dados-usuario--infos">
          <h2>{dadosUsuario?.email}</h2>
          <h1>{dadosUsuario?.nome}</h1>
          <h3>{dadosUsuario?.apelido}</h3>
          <span>Data nascimento: {dadosUsuario?.dataNascimento}</span>
          {renderDadosAmigo()}
        </div>
      </div>

      <div className="perfil__posts">
        <Post dadosPost={postUsuario} dadosUsuario={user} />
        {postUsuario?.number < postUsuario?.totalPages - 1 ? (
          <Botao
            titulo="Carregar mais"
            handleClick={buscarProxPaginaPostsUsuario}
          />
        ) : null}
      </div>
    </section>
  );
}