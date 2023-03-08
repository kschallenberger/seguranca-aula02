import { useState, useEffect } from "react";
import { getListaUsuarios } from "../../api";
import useGlobalUser from "../../context/user/user.contex";
import useGlobalSearch from "../../context/search/search.contex";

export function useObterListaUsuarios(idUsuario) {
    const [user, setUser] = useGlobalUser();
    const [search,] = useGlobalSearch();
    const [listaUsuarios, setListaUsuarios] = useState();
    const [carregando, setCarregando] = useState(false);
    const [pagina, setPagina] = useState(0);

    async function obterlistaUsuarios(estaBuscando) {
        setCarregando(true)
        try {
            const response = await getListaUsuarios(pagina, search);
            if (estaBuscando) {
                setListaUsuarios(response);
            } else {
                const novoContent = (listaUsuarios?.content ? [...listaUsuarios?.content, ...response?.content] : [...response?.content]);
                setListaUsuarios({
                    ...response,
                    content: novoContent
                });
            }

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
        setPagina(0)
        obterlistaUsuarios(true);
    }, [search])

    useEffect(() => {
        obterlistaUsuarios()
    }, [pagina]);

    async function buscarProxPaginaListaUsuarios() {
        setPagina(paginaAntiga => paginaAntiga + 1);
    }

    return { listaUsuarios, carregando, buscarProxPaginaListaUsuarios }
}
