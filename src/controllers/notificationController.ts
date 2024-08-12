import { useMutation } from '@tanstack/react-query';

import api from "../services/axios";

interface NotificationDataProp{
    fcm_token: string;
    message: string;
}

export function useCreateNotification(){
    return useMutation({
        mutationKey: ["createNotification"],
        mutationFn: async (notificationData:NotificationDataProp) => {
            const data = await api.post("/notification/create", {
                fcm_token: notificationData.fcm_token,
                message: notificationData.message,
            });

            return data;
        }
    });
}