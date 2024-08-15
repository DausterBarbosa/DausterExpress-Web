import {ReactNode, createContext, useState, useEffect} from "react";

import {useGetAuthorization} from "../controllers/loginController";

import Api from "../services/axios";

interface User{
    id: string;
    nome: string;
    sobrenome: string;
    cidade: string;
    cep: string;
    email: string;
    endereco: string;
    estado: string;
    numero: string;
    telefone: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    isPending: boolean;
    signIn(email:string, password:string):Promise<void>;
    signOut(): void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [loading, setLoading] = useState(true);

    const {mutateAsync, isPending} = useGetAuthorization();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await localStorage.getItem("@DausterExpressAuth:user");
            const storagedToken = await localStorage.getItem("@DausterExpressAuth:token");
    
            Api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

            if (storagedUser && storagedToken){
                setUser(JSON.parse(storagedUser));
            }

            setLoading(false);
        }
    
        loadStorageData();
    }, []);

    async function signIn(email:string, password:string){
        const data = await mutateAsync({email, password});

        Api.defaults.headers.Authorization = `Bearer ${data.data.data.token}`;

        await localStorage.setItem("@DausterExpressAuth:user", JSON.stringify(data.data.data.user));
        await localStorage.setItem("@DausterExpressAuth:token", data.data.data.token);

        setUser(data.data.data.user);
    }

    async function signOut(){
        await localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, isPending, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;