import {useMutation} from "@tanstack/react-query";

import Api from "../services/axios";

interface UserCredentialsData{
    email: string;
    password: string;
}

export function useGetAuthorization(){
    return useMutation({
        mutationKey: ["getAuthorization"],
        mutationFn: async (userData:UserCredentialsData) => {
            const data = await Api.post("/adm-password/login", {
                email: userData.email,
                password: userData.password,
            });

            return data;
        }
    });
}