import { axiosInstance } from "../_base/axios.instance";

export async function postInserirUsuario(request) {
    const response = await axiosInstance.post(`/usuarios`, request)
    return response.data;
}