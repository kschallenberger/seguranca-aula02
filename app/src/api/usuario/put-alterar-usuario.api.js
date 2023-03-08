import { axiosInstance } from "../_base/axios.instance";

export async function putAlterarUsuario(request) {
    await axiosInstance.put(`/usuarios`, request)
}