import { useState } from "react";
import { postInserirUsuario } from "../../api";
import useGlobalUser from "../../context/user/user.contex";
import { useNavigate } from "react-router-dom";

export function useControleFormularioCadastro() {
    const [user,] = useGlobalUser();
    const navigate = useNavigate();

    const [formInputsCadastro, setFormInputsCadastro] = useState({
        nome: { valor: "", erro: "" },
        email: { valor: "", erro: "" },
        telefone: { valor: "", erro: "" },
        senha: { valor: "", erro: "" },
        confirmacaoSenha: { valor: "", erro: "" },
        foto: { valor: "", erro: "" },
        erroCadastro: ""
    });

    function handleChangeInput(event) {
        const { name, value } = event.target;
        
        if (name === "telefone") {
            aplicaMascara(value);
            return;
        }

        setFormInputsCadastro((oldFormInput) => ({
            ...oldFormInput,
            [name]: { valor: value, erro: "" },
            erroCadastro: ""
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!_dadosValidos()) {
            return;
        }
        try {
            const request = {
                email: formInputsCadastro.email.valor,
                nome: formInputsCadastro.nome.valor,
                senha: formInputsCadastro.senha.valor,
                telefone: formInputsCadastro.telefone.valor.replace(/[^0-9]/g, ''),
                foto: formInputsCadastro.foto.valor
            }
            await postInserirUsuario(request);
            navigate("/login");
        }
        catch (error) {
            setFormInputsCadastro((oldFormInput) => ({
                ...oldFormInput,
                erroCadastro: error.response.data.message
            }))
        }
    }

    function _dadosValidos() {
        const nomeInvalido = !formInputsCadastro.nome.valor;
        const emailInvalido = !formInputsCadastro.email.valor;
        const telefoneInvalido = !formInputsCadastro.telefone.valor || formInputsCadastro.telefone.valor.length < 20;
        const senhaInvalido = !formInputsCadastro.senha.valor;
        const confirmacaoSenhaInvalido = formInputsCadastro.confirmacaoSenha.valor !== formInputsCadastro.senha.valor;

        if (nomeInvalido) {
            setFormInputsCadastro((oldFormInput) => ({
                ...oldFormInput,
                nome: { ...oldFormInput.nome, erro: "Informe um nome de usuário!" }
            }))
        }
        if (emailInvalido) {
            setFormInputsCadastro((oldFormInput) => ({
                ...oldFormInput,
                email: { ...oldFormInput.senha, erro: "Informe o e-mail de usuário!" }
            }))
        }
        if (telefoneInvalido) {
            setFormInputsCadastro((oldFormInput) => ({
                ...oldFormInput,
                telefone: { ...oldFormInput.senha, erro: "Informe um telefone válido!" }
            }))
        }
        if (senhaInvalido) {
            setFormInputsCadastro((oldFormInput) => ({
                ...oldFormInput,
                senhaInvalido: { ...oldFormInput.senha, erro: "Informe sua senha!" }
            }))
        }
        if (confirmacaoSenhaInvalido){
            setFormInputsCadastro((oldFormInput) => ({
                ...oldFormInput,
                confirmacaoSenha: { ...oldFormInput.senha, erro: "As senhas informadas não conferem!" }
            }))
        }
        return !(nomeInvalido || emailInvalido || telefoneInvalido || senhaInvalido || confirmacaoSenhaInvalido);
    }

    function aplicaMascara(telefone) {
        if (telefone.length > 20) {
            return; 
        }
        const novoValorSoNumeros = telefone.replace(/[^0-9]/g, '');
        const mascaraPrimeiraParte = novoValorSoNumeros.length > 2 ? novoValorSoNumeros.replace(/(\d{2})(\d)/, "($1) $2") : novoValorSoNumeros;
        const mascaraSegundaParte = mascaraPrimeiraParte.length > 7 ? mascaraPrimeiraParte.replace(/(\d{2})(\d)/, "($1) $2") : mascaraPrimeiraParte;
        const mascaraTerceiraParte = mascaraSegundaParte.length > 16 ? mascaraSegundaParte.replace(/(\d{5})(\d{1,4})$/, "$1-$2") : mascaraSegundaParte;

        setFormInputsCadastro((oldFormInput) => ({
            ...oldFormInput,
            telefone: { valor: mascaraTerceiraParte, erro: "" },
        }));
    }

    return { formInputsCadastro, handleChangeInput, handleSubmit }
}