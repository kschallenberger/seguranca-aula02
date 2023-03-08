import { axiosInstance } from "../_base/axios.instance";

export async function getListaUsuarios(page = 0, search = "") {
    const response = await axiosInstance.get(`/usuarios?search=${search}&size=10&page=${page}&sort=nome`)
    return response.data;
}