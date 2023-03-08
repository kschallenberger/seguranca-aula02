import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalUserProvider } from './context/user/user.contex';
import { GlobalSearchProvider } from './context/search/search.contex';
import './App.css';

function App() {
  return (
    <GlobalUserProvider>
      <GlobalSearchProvider>
        <RouterProvider router={router}></RouterProvider>
      </GlobalSearchProvider>
    </GlobalUserProvider>
  );
}

export default App;
