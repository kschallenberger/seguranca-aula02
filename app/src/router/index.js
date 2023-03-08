import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Cadastro, EditarUsuario, Usuarios } from "../ui/screens";

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
  }
]);
