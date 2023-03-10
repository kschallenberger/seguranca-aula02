import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putRedefinirSenha } from "../../api";

export function useControleFormularioRedefinirSenha(hashRecuperacao) {
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const [formInputsRedefinirSenha, setFormInputsRedefinirSenha] = useState({
        senha: { valor: "", erro: "" },
        confirmacaoSenha: { valor: "", erro: "" },
        erroRedefinirSenha: ""
    });

    function handleChangeInput(event) {
        const { name, value } = event.target;

        setFormInputsRedefinirSenha((oldFormInput) => ({
            ...oldFormInput,
            [name]: { valor: value, erro: "" },
            erroRedefinirSenha: ""
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!_dadosValidos()) {
            return;
        }
        try {
            setCarregando(true);
            await putRedefinirSenha({ novaSenha: formInputsRedefinirSenha.senha.valor.toLowerCase(), hashRecuperacao});
            navigate("/login");
        }
        catch (error) {
            setFormInputsRedefinirSenha((oldFormInput) => ({
                ...oldFormInput,
                erroRedefinirSenha: error?.response?.data?.message
            }))
        }
        finally {
            setCarregando(false);
        }
    }

    function _dadosValidos() {
        const senhaInvalido = !formInputsRedefinirSenha.senha.valor
        const confirmacaoSenhaInvalido = formInputsRedefinirSenha.confirmacaoSenha.valor != formInputsRedefinirSenha.senha.valor
        if (senhaInvalido) {
            setFormInputsRedefinirSenha((oldFormInput) => ({
                ...oldFormInput,
                senhaInvalido: { ...oldFormInput.senha, erro: "Informe sua senha!" }
            }))
        }
        if (confirmacaoSenhaInvalido){
            setFormInputsRedefinirSenha((oldFormInput) => ({
                ...oldFormInput,
                confirmacaoSenha: { ...oldFormInput.senha, erro: "As senhas informadas não conferem!" }
            }))
        }
        return !(senhaInvalido || confirmacaoSenhaInvalido);
    }

    return { formInputsRedefinirSenha, carregando, handleChangeInput, handleSubmit }
}