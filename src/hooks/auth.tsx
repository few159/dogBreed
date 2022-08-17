import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { httpRequest } from '../providers/customAxios/customAxios';
import { IRegisterResponse } from '../interfaces/login';
import { Storage } from '../providers/storage';
import { decodeToken } from "react-jwt";

interface AuthProps {
    children: ReactNode;
}

interface AuthContextData {
    login: (email: string, event: any, keep?: boolean) => Promise<void | boolean>
    verifyToken: () => Promise<boolean>
    token: string
}

const AuthContextData = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProps) {
    const storage = new Storage()
    const [token, setToken] = useState<string>(null)

    async function verifyToken() {
        if(token) return true
        
        let storageToken: string | null = storage.getLocalStorage('token')
        if (!storageToken && !token) return false

        const decodedToken: any = decodeToken(storageToken)

        if (new Date(decodedToken.exp * 1000) > new Date()) {
            setToken(storageToken)    
            return true
        }

        return false
    }

    async function login(email: string, event, keep: boolean = false) {
        try {
            event.preventDefault()

            if (email.length == 0) throw 'Preencha um email'

            let requestBody = { email }

            const { data: authResponse } = await httpRequest.post<{ email: string }, AxiosResponse<IRegisterResponse>>('https://dogbreed-api.q9.com.br/register', requestBody)

            setToken(authResponse.user.token)

            if (keep) storage.setLocalStorage('token', authResponse.user.token)

            return true
        } catch (error) {
            console.error('Err: ' + error)
        }
    }

    return (
        <AuthContextData.Provider value={{
            login,
            verifyToken,
            token
        }}>
            {children}
        </AuthContextData.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContextData);

    return context;
}
