import { useQuery, useMutation } from '@tanstack/react-query';
import api from "../services/axios";

export function useGetOrders(page:number){
    return useQuery({
        queryKey: ["getOrders", page],
        queryFn: async () => {
            const orders = await api.get("/order", {
                params: {
                    page,
                    take: 5
                }
            });

            return orders.data;
        },
    });
}

interface OrderDataProp{
    recipient: string;
    deliveryman: string;
    order: string;
}

export function useCreateOrders(){
    return useMutation({
        mutationKey: ["createOrders"],
        mutationFn: async (orderData:OrderDataProp) => {
            const data = await api.post("/order/create", {
                destinatario: orderData.recipient,
                entregador: orderData.deliveryman,
                encomenda: orderData.order
            });

            return data;
        }
    });
}