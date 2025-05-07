import { useState } from "react"
import { useEffect } from "react";
import "../css/TheeGridLayot.css";

const GetServices = () => {

    interface Service {
        service_name: string, 
        service_description: string, 
        service_picture: string, 
    }

    const [serviceData, setServiceData] = useState<Service[]>([{service_name:"", service_description:"", service_picture: ""}]); 
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
                setServiceData(data); 
            }

        } catch(error) {
            setInfo(["Kunde inte hämta tjänster! Försök igen senare"]); 
            console.log(error); 
        }
    }

    useEffect(() => {
        getService(); 
    }, []); 
    return (
        <>
        <div id="gridContainer">
            {
                serviceData.map((service, index) => (
                    <article key={index} className="gridItem">
                        {service.service_picture && (
                            <img src={`http://localhost:3000${service.service_picture}`} alt="nyhetsbild" />
                        )}
                        <h3>{service.service_name}</h3>
                        <p>{service.service_description}</p>
                    </article>
                ))
            }
            
            {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </div>
        </>
    )
}

export default GetServices; 