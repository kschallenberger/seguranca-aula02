import "./header.style.css";
import { logout } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import useGlobalSearch from "../../../context/search/search.contex";
import useGlobalUser from "../../../context/user/user.contex";
import icone from "../../../assets/image/logo.png";
import imgSearch from "../../../assets/image/lupa.svg";

export function Header() {
  const [search, , handleChange] = useGlobalSearch();
  const [user, setUser] = useGlobalUser();
  const navigate = useNavigate();

  function handleClickSair() {
    logout();
    setUser(null);
    navigate("/login");
  }

  function renderDadosUsuario() {
    if (!user) return;
    return (
      <>
        <Link className="header__link--dados-usuario" to={`/`}>
          <h1>{user.nome}</h1>
          <div>
            <img src={user.foto} alt="" />
          </div>
        </Link>
        <Link className="header__link--logout" onClick={handleClickSair}>
          x
        </Link>
      </>
    );
  }

  function renderDadosLogin() {
    if (user) return;

    return (
      <>
        <Link className="header__link" to="/login">
          Login
        </Link>
        <Link className="header__link" to="/cadastro">
          Cadastre-se
        </Link>
      </>
    );
  }

  return (
    <header className="header__">
      <Link to="/">
        <div className="header__div--logo">
          <img src={icone} alt="" />
        </div>
      </Link>
      <Link className="header__link--lista-usuarios" to="/usuarios">
        Usuários
      </Link>
      <div className="header_div--dados-usuario">
        {renderDadosUsuario()} {renderDadosLogin()}
      </div>
    </header>
  );
}
