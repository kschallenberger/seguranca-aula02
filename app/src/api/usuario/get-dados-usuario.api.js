import { axiosInstance } from "../_base/axios.instance";

export async function getDadosUsuario(idUsuario) {
    const response = await axiosInstance.get(`/usuarios/${idUsuario}`)
    return response.data;
}