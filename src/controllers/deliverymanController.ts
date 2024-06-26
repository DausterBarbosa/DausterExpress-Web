import { useQuery, useMutation } from '@tanstack/react-query';
import api from "../services/axios";

export function useDeleteDeliveryman(){
    return useMutation({
        mutationKey: ['deleteDeliveryman'],
        mutationFn: async (deliverymanId:string) => {
            const data = await api.delete(`/deliveryman/delete/${deliverymanId}`);

            return data;
        }
    });
}

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

interface DeliverymanQueryProps {
    page: number | null;
    take: number | null;
    mode: string;
    entregador: string;
}

export function useGetDeliverymans(auto:boolean, query:DeliverymanQueryProps){
    return useQuery({
        queryKey: ["getDeliverymans", auto, query],
        queryFn: async () => {
            const recipients = await api.get("/deliveryman", {
                params: {
                    page: query.page === null ? '' : query.page! + 1,
                    take: query.take === null ? '' : query.take,
                    mode: query.mode,
                    entregador: query.entregador,
                }
            });

            return recipients.data;
        },
        enabled: auto,
    });
}