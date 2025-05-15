import { useState } from "react"; 
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import placeholder from "../assets/temp-placeholder.jpg";
import "../css/SinglePageStyle.css"; 

const ServiceSingle = () => {

    interface Service {
        _id: string,
        service_name: string, 
        service_description: string, 
        service_picture: string, 
    }

    const {id} = useParams<{id:string}>(); 
    const [serviceInfo, setServiceInfo] = useState<Service>({_id: "", service_name:"", service_description: "", service_picture: ""}); 
    
    const getSingleService = async () => {
        try {
          const response = await fetch("http://localhost:3000/service/" + id, {
            method: "GET"
          }); 
    
          if(!response.ok) {
    
            console.log("fel vid hämtning av nyhet"); 
    
          } else {
    
            const data = await response.json(); 
            setServiceInfo(data);
    
          }
    
        } catch(error) {
          console.log(error); 
    
        }
    
    }

    useEffect(() => {
        getSingleService(); 
    }, [id]); 

  return (
    <>
    <main>
      <div id="singleArticleContainer">
        <div id="singleImgContainer">
            {
              serviceInfo.service_picture ? (
                <img src={`http://localhost:3000${serviceInfo.service_picture}`} alt="nyhetsbild"/>
              ) : (
                <img src={placeholder} alt="placeholder" />
              )
            }
        </div>

        <h1>{serviceInfo.service_name}</h1>
        <article id="singleItemContent">{serviceInfo.service_description}</article>

      </div>
    </main>
    </>
  )
}

export default ServiceSingle