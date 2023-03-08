import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putAlterarUsuario, getDadosUsuario } from "../../api";
import useGlobalUser from "../../context/user/user.contex";

export function useControleFormularioEditarUsuario() {
    const [user, setUser] = useGlobalUser();
    const navigate = useNavigate();

    const [formInputsEditarUsuario, setFormInputsEditarUsuario] = useState({
        nome: { valor: user.nome, erro: "" },
        telefone: { valor: montaMascara(user.telefone), erro: "" },
        senha: { valor: "", erro: "" },
        confirmacaoSenha: { valor: "", erro: "" },
        foto: { valor: user.foto, erro: "" },
        erroCadastro: ""
    });

    function handleChangeInput(event) {
        const { name, value } = event.target;

        if (name === "telefone") {
            aplicaMascara(value);
            return;
        }

        setFormInputsEditarUsuario((oldFormInput) => ({
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
                nome: formInputsEditarUsuario.nome.valor,
                senha: formInputsEditarUsuario.senha.valor,
                telefone: formInputsEditarUsuario.telefone.valor.replace(/[^0-9]/g, ''),
                foto: formInputsEditarUsuario.foto.valor
            }
            await putAlterarUsuario(request);
            const response = await getDadosUsuario(user.id);
            setUser({ ...response, id: user.id });
            navigate("/")
        }
        catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                return;
            }
            setFormInputsEditarUsuario((oldFormInput) => ({
                ...oldFormInput,
                erroCadastro: error.response.data.message
            }))
        }
    }

    function _dadosValidos() {
        const nomeInvalido = !formInputsEditarUsuario.nome.valor;
        const telefoneInvalido = !formInputsEditarUsuario.telefone.valor || formInputsEditarUsuario.telefone.valor.length < 20;
        const confirmacaoSenhaInvalido = formInputsEditarUsuario.confirmacaoSenha.valor !== formInputsEditarUsuario.senha.valor;

        if (nomeInvalido) {
            setFormInputsEditarUsuario((oldFormInput) => ({
                ...oldFormInput,
                nome: { ...oldFormInput.nome, erro: "Informe um nome de usuário!" }
            }))
        }
        if (telefoneInvalido) {
            setFormInputsEditarUsuario((oldFormInput) => ({
                ...oldFormInput,
                telefone: { ...oldFormInput.senha, erro: "Informe um telefone válido!" }
            }))
        }
        if (confirmacaoSenhaInvalido) {
            setFormInputsEditarUsuario((oldFormInput) => ({
                ...oldFormInput,
                confirmacaoSenha: { ...oldFormInput.senha, erro: "As senhas informadas não conferem!" }
            }))
        }
        return !(nomeInvalido || telefoneInvalido || confirmacaoSenhaInvalido);
    }

    function aplicaMascara(telefone) {
        if (telefone.length > 20) {
            return;
        }
        const telComMascara = montaMascara(telefone);
        setFormInputsEditarUsuario((oldFormInput) => ({
            ...oldFormInput,
            telefone: { valor: telComMascara, erro: "" },
        }));
    }

    function montaMascara(telefone) {
        const novoValorSoNumeros = telefone.replace(/[^0-9]/g, '');
        const mascaraPrimeiraParte = novoValorSoNumeros.length > 2 ? novoValorSoNumeros.replace(/(\d{2})(\d)/, "($1) $2") : novoValorSoNumeros;
        const mascaraSegundaParte = mascaraPrimeiraParte.length > 7 ? mascaraPrimeiraParte.replace(/(\d{2})(\d)/, "($1) $2") : mascaraPrimeiraParte;
        const mascaraTerceiraParte = mascaraSegundaParte.length > 16 ? mascaraSegundaParte.replace(/(\d{5})(\d{1,4})$/, "$1-$2") : mascaraSegundaParte;
        return mascaraTerceiraParte;
    }
    return { formInputsEditarUsuario, handleChangeInput, handleSubmit }
}