import { defineStore } from "pinia"
import { get_user, create_user, update_user, delete_user, get_paginated_users } from "../services/user.service";
import { CreateUser, GetUser, UpdateUser } from "../types/user.type";
import { useToast } from "vue-toastification";
import { paginate } from "../algorithm/paginated"

const toast = useToast();
export const UseUserStore = defineStore("user", {
    state: () => ({
        user: [] as GetUser[],
        pages: [] as Array<string | number>,
        paginates: {
            total: 0,
            totalPages: 0,
            nextPag: 0,
            prevPag: 0,
            currentPage: 0,
        },
    }),
    actions: {
        async GetAllUser(){
            try {
                const data = await get_user();
                this.user = data.users;
            } catch{
                toast.error("Error")
            }
        },

        async CreateUser(values: CreateUser) {
            try {
                const data = await create_user(values);

                if (data.ok) {
                    toast.success("Usuario creado");
                }else{
                    toast.error("Error al crear el usuario")
                }
            } catch (error) {
                toast.error("Error en el servidor");
            }
        },

        async DeleteUser(id: number) {
            try {
                const data = await delete_user(id);
                if (data.ok) {
                    await this.GetAllUser();
                    toast.success("Usuario eliminado");
                }
            } catch {
                toast.error("Error")
            }
        },

        async UpdateUser(id:number, values:UpdateUser) {
            try {
                const data = await update_user(id, values);
                if (data.ok) {
                    toast.info("Usuario actualizado")
                }else{
                    toast.error("Error al actualizar usuario")
                }
            } catch (error) {
                toast.error("Error en el servidor")
            }
        },

        //! Pagination
        async GetUsersPaginated(page: number, take: number) {
            try {
                const data = await get_paginated_users(page, take);
                this.user = data.users;
                this.paginates = {
                    total: data.total,
                    totalPages: data.totalPages,
                    nextPag: data.nextPage,
                    prevPag: data.prevPage,
                    currentPage: page,
                };
                this.pages = paginate(page, data.totalPages);
            } catch (e) {
                toast.error("Error de servidor: " + e)
            };
        }
    }
});