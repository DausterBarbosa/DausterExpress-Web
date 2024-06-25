import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export function useGetStates(){
    return useQuery({
        queryKey: ["getStates"],
        queryFn: async () => {
            const states = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

            return states.data;
        }
    });
}

export function useGetCities(state:string){
    return useQuery({
        queryKey: ["getCities", state],
        queryFn: async () => {
            const cities = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`);
            
            return cities.data;
        },
        enabled: state !== '',
    });
}