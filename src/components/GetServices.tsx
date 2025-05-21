import { useState } from "react"
import { useEffect } from "react";
import "../css/TheeGridLayot.css";
import { useNavigate } from "react-router-dom";

const GetServices = () => {

    interface Service {
        _id: string, 
        service_name: string, 
        service_description: string, 
        service_picture: string, 
    }

    const navigate = useNavigate(); 
    const [serviceData, setServiceData] = useState<Service[]>([{_id: "", service_name:"", service_description:"", service_picture: ""}]); 
    const [info, setInfo] = useState<string[]>([]); 

    const getService = async () => {
        try {
            const response = await fetch("http://localhost:3000/service", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                setInfo(["Kunde inte hämta tjänster! Försök igen senare"]); 
            } else {
                const data = await response.json(); 
                setServiceData(data.reverse()); 
            }

        } catch(error) {
            setInfo(["Kunde inte hämta tjänster! Försök igen senare"]); 
            console.log(error); 
        }
    }
    
    const goToSinglePage = (id: string) => {
        navigate("/service/" + id); 
    }

    useEffect(() => {
        getService(); 
    }, []); 
    return (
        <>
        <div id="gridContainer" title="Läs mer">
            {
                serviceData.map((service, index) => (
                    <article key={index} className="gridItem" onClick={() => goToSinglePage(service._id)}>
                        {service.service_picture && (
                            <img src={`http://localhost:3000${service.service_picture}`} alt="nyhetsbild" />
                        )}
                        <h2>{service.service_name}</h2>
                        <p>{service.service_description.length > 100 ? service.service_description.substring(0, 100) + "..." : service.service_description}</p>
                    </article>
                ))
            }
            
            {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </div>
        </>
    )
}

export default GetServices; 