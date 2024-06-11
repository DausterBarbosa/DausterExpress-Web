import { useQuery } from '@tanstack/react-query';
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