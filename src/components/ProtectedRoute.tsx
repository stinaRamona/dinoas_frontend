import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode
}; 

const ProtectedRoute : React.FC<ProtectedRouteProps> = ({children}) => {
    const {user} = useAuth(); 

    if(!user) {
        return <Navigate to="/login" replace />
    }

    return (

        <>{children}</>

    )
}

export default ProtectedRoute