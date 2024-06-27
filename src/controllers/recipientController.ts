import { useQuery, useMutation } from '@tanstack/react-query';
import api from "../services/axios";

interface RecipientQueryProps {
    page: number | null;
    take: number | null;
    mode: string;
    destinatario: string;
}

export function useGetRecipients(auto:boolean, query:RecipientQueryProps){
    return useQuery({
        queryKey: ["getRecipients", auto, query],
        queryFn: async () => {
            const destinatario = await api.get("/recipient", {
                params: {
                    page: query.page === null ? '' : query.page! + 1,
                    take: query.take === null ? '' : query.take,
                    mode: query.mode,
                    destinatario: query.destinatario, 
                }
            });

            return destinatario.data;
        },
        enabled: auto,
    });
}

interface FormDataProps{
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
    estado: string;
    cidade: string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
}

export function useRegisterRecipients(){
    return useMutation({
        mutationKey: ['registerRecipient'],
        mutationFn: async (recipientData:FormDataProps) => {
            const data = await api.post("/recipient/create", {
                ...recipientData
            });

            return data;
        }
    });
}

export function useDeleteRecipient(){
    return useMutation({
        mutationKey: ['deleteRecipient'],
        mutationFn: async (recipientId:string) => {
            const data = await api.delete(`/recipient/delete/${recipientId}`);

            return data;
        }
    });
}