import { useQuery, useMutation } from '@tanstack/react-query';
import api from "../services/axios";

interface FormDataProps{
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    estado: string;
    cidade: string;
    cep: string;
    endereco: string;
    numero: string;
}

export function useRegisterDeliverymans(){
    return useMutation({
        mutationKey: ['registerDeliveryman'],
        mutationFn: async (deliverymanData:FormDataProps) => {
            const data = await api.post("/deliveryman/create", {
                ...deliverymanData
            });

            return data;
        }
    });
}

export function useGetDeliverymans(auto:boolean){
    return useQuery({
        queryKey: ["getDeliverymans", auto],
        queryFn: async () => {
            const recipients = await api.get("/deliveryman", {
                params: {
                    mode: "summary"
                }
            });

            return recipients.data;
        },
        enabled: auto,
    });
}