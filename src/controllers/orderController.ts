import { useQuery, useMutation } from '@tanstack/react-query';
import api from "../services/axios";

export function useGetStatus(){
    return useQuery({
        queryKey: ["getStatus"],
        queryFn: async () => {
            const status = await api.get("/order/status");

            return status.data;
        }
    });
}

interface OrderQueryProps {
    page: number;
    status: string;
    encomenda: string;
}

export function useGetOrders(query:OrderQueryProps){
    return useQuery({
        queryKey: ["getOrders", query],
        queryFn: async () => {
            const orders = await api.get("/order", {
                params: {
                    page: query.page + 1,
                    take: 5,
                    status: query.status,
                    encomenda: query.encomenda
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

interface ChangeStatusOrderProp{
    id: string;
    status: string;
}

export function useChangeStatusOrder(){
    return useMutation({
        mutationKey: ["changeStatusOrder"],
        mutationFn: async(status:ChangeStatusOrderProp) => {
            const data = await api.put(`/order/${status.id}/status`, {
                status: status.status,
            });

            return data;
        }
    });
}