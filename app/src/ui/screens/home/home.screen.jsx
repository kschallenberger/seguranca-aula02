import { Link, useNavigate } from "react-router-dom";
import useGlobalUser from "../../../context/user/user.contex";
import { Header } from "../../components";
import "./home.style.css";
import { useObterDadosUsuario } from "../../../hooks";
import { useEffect } from "react";
import { FaUserEdit, FaUserAlt } from "react-icons/fa";


export function Home() {
  const [user, setUser] = useGlobalUser();
  const { dadosUsuario } = useObterDadosUsuario();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

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
    <section className="home__section">
      <Header />
      <div className="home__dados-usuario">
        <div className="home__dados-usuario--img">
            {dadosUsuario?.foto ? <img src={dadosUsuario?.foto} alt="" /> : <FaUserAlt className="home__dados-usuario--img"/>}
        </div>
        <div className="home__dados-usuario--infos">
          <h2>{dadosUsuario?.email}</h2>
          <h1>{dadosUsuario?.nome}</h1>
          <h3>{aplicaMascara(dadosUsuario?.telefone)}</h3>
          <span>Data cadastro: {new Date(dadosUsuario?.criadoEm).toLocaleTimeString()} - {new Date(dadosUsuario?.criadoEm).toLocaleDateString()}</span>
          {dadosUsuario?.atualizadoEm ? (
            <span>Última alteração: {new Date(dadosUsuario?.atualizadoEm).toLocaleTimeString()} - {new Date(dadosUsuario?.atualizadoEm).toLocaleDateString()}</span>
          ) : null}
        </div>
        <div className="home__dados-usuario--alteracao">
          <Link to="/editar-usuario">
            <FaUserEdit className="home__dados-usuario--icone"/>
          </Link>
        </div>
      </div>
    </section>
  );
}
