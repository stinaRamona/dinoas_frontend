import { useState } from "react";
import "../css/GeneralFormStyle.css"; 


const AddServiceForm = ({onServiceAdded} : {onServiceAdded: () => void}) => {
    interface Service {
        service_name: string, 
        service_description: string, 
        file: File | null, 
    }

    const [serviceData, setServiceData] = useState<Service>({service_name: "", service_description: "", file: null}); 
    const [info, setInfo] = useState<string[]>([]); 

    const addService = async (e: any) => {
        e.preventDefault(); 

        //validering av formulär
        const infos = []; 

        if(!serviceData.service_name) {
            infos.push("Du måste ange ett namn");
        }

        if(!serviceData.service_description) {
            infos.push("Du måste ange en beskrivning"); 
        }

        if(infos.length) {
            setInfo(infos);
        }

        //gör om till FormData
        const serviceBody = new FormData(); 
        serviceBody.append("service_name", serviceData.service_name); 
        serviceBody.append("service_description", serviceData.service_description); 
        if(serviceData.file) {
            serviceBody.append("file", serviceData.file)
        }

        //lägga till nytt project
        try {
            const response = await fetch("http://localhost:3000/service", {
                method: "POST", 
                body: serviceBody,
            }); 

            if(!response.ok) {
                infos.push("Kunde inte lägga till projekt"); 
            }

            const data = await response.json(); 
            console.log(data); 

            setInfo(["Tjänsten har lagts till"]); 
            setServiceData({service_name: "", service_description: "", file: null});
            onServiceAdded(); 
            
        } catch(error) {
            setInfo(["Något gick fel vid skapande av tjänsten. Försök igen senare"]);
            console.log(error);
        }
    }

    return (
    <>
    <h3>Lägg till en tjänst</h3>
    <form onSubmit={addService} encType="multipart/form-data" id="generalForm">
        <label htmlFor="name">Projektnamn:</label><br />
        <input type="text" name="name" id="name" value={serviceData.service_name}
        onChange={(e) => setServiceData({...serviceData, service_name: e.target.value})}
        /><br />

        <label htmlFor="content">Information om projekt:</label><br />
        <input type="text" name="content" id="content" value={serviceData.service_description} 
        onChange={(e) => setServiceData({...serviceData, service_description: e.target.value})}
        /><br />

        <label htmlFor="image">Bild:</label><br />
        <input type="file" name="image" id="image" 
        onChange={(e) => setServiceData({...serviceData, file: e.target.files?.[0] || null})}/>

        <input type="submit" value="Lägg till"/>
    </form> 

    {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
    </>
    )
}

export default AddServiceForm
