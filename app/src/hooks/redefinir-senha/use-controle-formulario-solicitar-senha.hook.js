import { useState } from "react";
import { postRedefinirSenha } from "../../api";

export function useControleFormularioSolicitarSenha() {
    const [carregando, setCarregando] = useState(false);

    const [formInputsSolicitarSenha, setFormInputsSolicitarSenha] = useState({
        usuario: { valor: "", erro: "" },
        erroSolicitarSenha: ""
    });

    function handleChangeInput(event) {
        const { name, value } = event.target;

        setFormInputsSolicitarSenha((oldFormInput) => ({
            ...oldFormInput,
            [name]: { valor: value, erro: "" },
            erroSolicitarSenha: ""
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!_dadosValidos()) {
            return;
        }
        try {
            setCarregando(true);
            await postRedefinirSenha({ email: formInputsSolicitarSenha.usuario.valor.toLowerCase()});
            setFormInputsSolicitarSenha({
                usuario: { valor: "", erro: "" },
                erroSolicitarSenha: `Um e-mail para redefinição da senha foi enviado para: ${formInputsSolicitarSenha.usuario.valor.toLowerCase()}`
            })
        }
        catch (error) {
            setFormInputsSolicitarSenha((oldFormInput) => ({
                ...oldFormInput,
                erroSolicitarSenha: error?.response?.data?.message
            }))
        }
        finally {
            setCarregando(false);
        }
    }

    function _dadosValidos() {
        if (!formInputsSolicitarSenha.usuario.valor) {
            setFormInputsSolicitarSenha((oldFormInput) => ({
                ...oldFormInput,
                usuario: { ...oldFormInput.usuario, erro: "Informe um nome de usuário!" }
            }))
            return false;
        }
        return true;
    }

    return { formInputsSolicitarSenha, carregando, handleChangeInput, handleSubmit }
}