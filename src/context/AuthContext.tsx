import { User, LoginCred, AuthResponse, AuthContextType } from "../types/auth.types"; 
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | null>(null); 

interface AuthProviderProps {
    children: ReactNode
}; 

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [user, setUser] = useState<User | null>(null); 

    //Logga in funktion med credentials från auth.types.ts
    const login = async (credentials: LoginCred) => {

        if(credentials.email === "" || credentials.password == "") {
            console.log("Epost och lösenord måste skickas med"); 
            return; 
        }

        try {
            const response = await fetch("http://localhost:3000//login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(credentials)
            });

            if(!response.ok) {
                throw new Error("Något gick fel vid inloggning"); 
            }

            const data = await response.json() as AuthResponse; 

            localStorage.setItem("token", data.token); 

            setUser(data.user); 

        } catch(error) {
            console.error("Något gick fel vid inloggning", error); 
        }
    }

    const logout = () => {
        localStorage.removeItem("token"); 
        setUser(null); 
    }

    const validateToken = async () => {
        const token = localStorage.getItem("token"); 

        if(!token) {
            console.log("Ingen token hittades");
            return; 
        }
        
        //Om token finns, validera den mot servern
        try {
            const response = await fetch("http://localhost:3000/protected", {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + token
                }
            }); 

            if(response.ok) {
                const data = await response.json(); 
                setUser(data.user);
            }

        } catch(error) {
            localStorage.removeItem("token"); 
            setUser(null); 
            console.error("Något gick fel vid validering av token", error); 
        }
    }

    useEffect( () => {
        validateToken();
    }, []); 

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext); 

    if(!context) {
        throw new Error("useAuth måste användas inom AuthProvider"); 
    }

    return context; 
}