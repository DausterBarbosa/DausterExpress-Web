import { useQuery } from '@tanstack/react-query';
import api from "../services/axios";

interface ProblemQueryProps {
    page: number;
}

export function useGetProblems(query:ProblemQueryProps){
    return useQuery({
        queryKey: ["getProblems", query],
        queryFn: async () => {
            const orders = await api.get("/problem", {
                params: {
                    page: query.page + 1,
                    take: 5,
                }
            });

            return orders.data;
        },
    });
}