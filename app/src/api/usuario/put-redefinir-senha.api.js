import { axiosInstance } from "../_base/axios.instance";

export async function putRedefinirSenha(request) {
    const response = await axiosInstance.put(`/usuarios/redefinir-senha`, request)
    return response.data;
}