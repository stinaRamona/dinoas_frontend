//För att hantera tjänster (Uppdatera och radera)
import { useState } from "react";
import useDelete from "../hooks/useDelete";
import useUpdate from "../hooks/useUpdate";
import fetchData from "../hooks/fetchData";
import "../css/HandleItemStyle.css"; 
import "../css/GeneralFormStyle.css"; 

const HandleServices = ({refreshKey, refreshItemList} : {refreshKey : number; refreshItemList : () => void}) => {
    
    interface Service {
        _id: string, 
        service_name: string, 
        service_description: string,
        service_picture: string, 
    }

    //hooks
    const {data: services, loading} = fetchData(`http://localhost:3000/service?refreshKey=${refreshKey}`);
    const deleteService = useDelete("http://localhost:3000/service");
    const updateService = useUpdate("http://localhost:3000/service");

    //states
    const [selectedService, setSelectedService] = useState<Service | null>(null); 
    const [formValues, setFormValues] = useState({title: "", description: "", image: null}); 

    const handleDelete = async (id: string) => {
        await deleteService(id); 
        refreshItemList(); 
    };

    const handleUpdateBtnClick = (service: Service) => {
        setSelectedService(service); 
        setFormValues({
            title: service.service_name,
            description: service.service_description,
            image: null,
        })
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} =e.target; 

        setFormValues((prevValues) => ({
            ...prevValues,
            [name] : name === "image" ? (e.target.files ? e.target.files[0] : null) : value,
        }))
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if(!selectedService) return; 

        const updatedService = new FormData(); 
        updatedService.append("service_name", formValues.title);
        updatedService.append("service_description", formValues.description);
        if(formValues.image) {
            updatedService.append("file", formValues.image); 
        }

        await updateService(selectedService._id, updatedService);

        setSelectedService(null); 
        refreshItemList(); 
    }

    if(loading) {
        return <p>Laddar in tjänster...</p>
    }



    return (
        <>
        <div>
            <h3>Hantera tjänster</h3>
            {services.map((item: Service) => (
                <article key={item._id}>
                    <h4>{item.service_name}</h4>
                    <p>{item.service_description}</p>
                    {item.service_picture && (
                        <img src={`http://localhost:3000${item.service_picture}`} alt="Tjänstbild" />
                    )}
                    <button id="deleteBtn" onClick={() => handleDelete(item._id)}>Ta bort</button>
                    <button id="updateBtn" onClick={() => handleUpdateBtnClick(item)}>Uppdatera</button>
                </article>
            ))}
        </div>

        {selectedService && (
            <form id="generalForm" onSubmit={handleFormSubmit}>
                <h3>Uppdatera tjänst</h3>
                <label htmlFor="title">Tjänsttitel:</label><br />
                <input type="text" id="title" name="title" value={formValues.title} 
                onChange={handleFormChange}
                /><br />

                <label htmlFor="description">Beskrivning:</label><br />
                <input type="text" id="description" name="description" value={formValues.description} 
                onChange={handleFormChange}
                /><br />

                <label htmlFor="image">Bild:</label><br />
                <input type="file" id="image" name="image"
                onChange={handleFormChange}
                /><br /> 

                <button id="saveBtn" type="submit">Spara ändringar</button>
                <button id="cancelBtn" onClick={() => setSelectedService(null)}>Avbryt</button>
            </form>
        )}
        </>
    )
}

export default HandleServices;