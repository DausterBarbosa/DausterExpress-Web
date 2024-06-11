import { useQuery } from '@tanstack/react-query';
import api from "../services/axios";

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