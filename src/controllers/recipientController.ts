import { useQuery, useMutation } from '@tanstack/react-query';
import api from "../services/axios";

export function useGetRecipients(auto:boolean){
    return useQuery({
        queryKey: ["getRecipients", auto],
        queryFn: async () => {
            const recipients = await api.get("/recipient", {
                params: {
                    mode: "summary"
                }
            });

            return recipients.data;
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