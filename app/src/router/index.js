import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Cadastro, EditarUsuario, Usuarios, RedefinirSenha, EsqueciSenha } from "../ui/screens";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/editar-usuario",
    element: <EditarUsuario />
  },
  {
    path: "/usuarios",
    element: <Usuarios />
  },
  {
    path: "/redefinir-senha/:hash",
    element: <RedefinirSenha />
  },
  {
    path: "/esqueci-senha",
    element: <EsqueciSenha />
  }
]);
