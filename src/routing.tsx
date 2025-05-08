import { createBrowserRouter } from "react-router-dom";
//import av sidor
import HomePage from "./pages/HomePage"; 
import AboutPage from "./pages/AboutPage"; 
import NewsPage from "./pages/NewsPage"; 
import PortfolioPage from "./pages/PortfolioPage"; 
import ServicePage from "./pages/ServicePage"; 
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NewsSingle from "./pages/NewsSingle"; 
import PortfolioSingle from "./pages/PortfolioSingle";
import ServiceSingle from "./pages/ServiceSingle"; 
//import av Layout-komponent, som "mall" för samtliga sidor
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <Layout />, 
        children: [
            {
                path: "/", 
                element: <HomePage />, 
            }, 
        
            {
                path: "/om",
                element: <AboutPage /> 
            }, 
        
            {
                path: "/nyheter", 
                element: <NewsPage />
            },
        
            {
                path: "/tjanster", 
                element: <ServicePage />
            }, 
        
            {
                path: "/portfolio", 
                element: <PortfolioPage /> 
            }, 

            //enskild sida för nyhet, tjänst och portfolio

            {
                path: "/news/:id", 
                element: <NewsSingle />
            },

            {
                path: "/project/:id", 
                element: <PortfolioSingle />
            },

            {
                path: "/service/:id", 
                element: <ServiceSingle />
            },
            
            {
                path: "/login", 
                element: <LoginPage />
            }, 

            {
                path: "/admin", 
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                )
            }
        ]

    },

])

export default router; 