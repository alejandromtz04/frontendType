
import axios from 'axios'
import { API_URL } from '../utils/constans'
import { GetToken } from '../utils/persists'
import { GetRol } from '../types/rol.type'

export const create_rol = async (rol:string) => {
    const {data } = await axios.post<{ok:boolean, msg:string}>(
        API_URL + "/rol",
        {
            rol,
        },
        {
            headers: {
                Authorization: "Bearer" + GetToken(),
            },
        }
    )
    return data
};


export const get_rol = async () => {
    const { data } = await axios.get<{rol: GetRol[]}>(
        API_URL + "/rol",
        {
            headers: {
                Authorization: "Bearer" + GetToken(),
            },
        }
    );
    return data
}


export const update_rol = async (id: number, rol:string) => {
    const { data } = await axios.put<{ok:boolean, msg:string}> (
        API_URL + "/rol/" + id,
        {rol},
        {
            headers: {
                Authorization: "Bearer" + GetToken(),
            },
        },
    )
    return data
}

export const delete_rol = async (id:number) => {
    const { data } = await axios.delete<{ok:boolean, msg:string}> (
        API_URL + "/rol/" + id,
        {
            headers: {
                Authorization: "Bearer" + GetToken()
            },
        },
    );
    return data
}