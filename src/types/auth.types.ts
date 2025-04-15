//Interface för användare och autentisering 

export interface User {
    _id: string; 
    user_name: string; 
    email: string; 
    password: string; 
}

//De värden som skickas till inloggformulär
export interface LoginCred {
    email: string; 
    password: string; 
}

//Värdena somm skickas tillbaka från api:et vid lyckad inloggning
export interface AuthResponse {
    user: User; 
    token: string; 
}

export interface AuthContextType {
    user: User | null; 
    login: (credentials: LoginCred) => Promise<void>; 
    logout: () => void; 
}