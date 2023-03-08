import { useState } from "react";
import { login } from "../../api";
import useGlobalUser from "../../context/user/user.contex";

export function useControleFormulario() {
    const [user, setUser] = useGlobalUser();

    const [formInputsLogin, setFormInputsLogin] = useState({
        usuario: { valor: "", erro: "" },
        senha: { valor: "", erro: "" },
        erroLogin: ""
    });

    function handleChangeInput(event) {
        const { name, value } = event.target;

        setFormInputsLogin((oldFormInput) => ({
            ...oldFormInput,
            [name]: { valor: value, erro: "" },
            erroLogin: ""
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!_dadosValidos()) {
            return;
        }
        try {
            const response = await login({ username: formInputsLogin.usuario.valor.toLowerCase(), password: formInputsLogin.senha.valor });
            setUser(response);
        }
        catch (error) {

            console.log(error);

            setFormInputsLogin((oldFormInput) => ({
                ...oldFormInput,
                erroLogin: "Usuário ou senha inválido!"
            }))
        }
    }

    function _dadosValidos() {
        if (!formInputsLogin.usuario.valor) {
            setFormInputsLogin((oldFormInput) => ({
                ...oldFormInput,
                usuario: { ...oldFormInput.usuario, erro: "Informe um nome de usuário!" }
            }))
        }
        if (!formInputsLogin.senha.valor) {
            setFormInputsLogin((oldFormInput) => ({
                ...oldFormInput,
                senha: { ...oldFormInput.senha, erro: "Informe sua senha!" }
            }))
        }
        return !(formInputsLogin.usuario.erro || formInputsLogin.senha.erro);
    }

    return { formInputsLogin, handleChangeInput, handleSubmit }
}