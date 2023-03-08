import { useState, useEffect } from "react";
import { getDadosUsuario } from "../../api";
import useGlobalUser from "../../context/user/user.contex";

export function useObterDadosUsuario() {
    const [user, setUser] = useGlobalUser();
    const [carregando, setCarregando] = useState(false);
    const [dadosUsuario, setDadosUsuario] = useState();

    async function obterDetalhesUsuario() {
        setCarregando(true)
        try {
            const response = await getDadosUsuario(user.id);
            setDadosUsuario(response);
        } catch (error) {
        if (error.response.status === 401) {
            setUser(null);
        }
        console.log(error);
    } finally {
        setCarregando(false);
    }
}

useEffect(() => {
    obterDetalhesUsuario()
}, []);

return { dadosUsuario, carregando }
}
