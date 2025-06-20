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
    const {data: services, loading} = fetchData(`https://din-oas-api.onrender.com/service?refreshKey=${refreshKey}`);
    const deleteService = useDelete("https://din-oas-api.onrender.com/service");
    const updateService = useUpdate("https://din-oas-api.onrender.com/service");

    //states
    const [selectedService, setSelectedService] = useState<Service | null>(null); 
    const [formValues, setFormValues] = useState({upd_title: "", upd_description: "", upd_image: null}); 

    const handleDelete = async (id: string) => {
        if(!window.confirm("Är du säker på att du vill ta bort denna tjänst?")) {
            return; //Avbryt om användaren inte bekräftar
        }
        await deleteService(id); 
        refreshItemList(); 
    };

    const handleUpdateBtnClick = (service: Service) => {
        setSelectedService(service); 
        setFormValues({
            upd_title: service.service_name,
            upd_description: service.service_description,
            upd_image: null,
        })

        window.scrollTo({ left: 0, top: document.body.scrollHeight + 200, behavior: "smooth" });
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: name === "upd_image" && e.target instanceof HTMLInputElement
                ? (e.target.files ? e.target.files[0] : null)
                : value,
        }));
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if(!selectedService) return; 

        const updatedService = new FormData(); 
        updatedService.append("service_name", formValues.upd_title);
        updatedService.append("service_description", formValues.upd_description);
        if(formValues.upd_image) {
            updatedService.append("file", formValues.upd_image); 
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
        <div id="handleItemContainer">
            <h3>Hantera tjänster</h3>
            {services.map((item: Service) => (
                <article key={item._id}>
                    <h4>{item.service_name}</h4>
                    <p>{item.service_description}</p>
                    {item.service_picture && (
                        <img src={`https://din-oas-api.onrender.com${item.service_picture}`} alt="Tjänstbild" />
                    )}
                    <button id="deleteBtn" onClick={() => handleDelete(item._id)}>Ta bort</button>
                    <button id="updateBtn" onClick={() => handleUpdateBtnClick(item)}>Uppdatera</button>
                </article>
            ))}
        </div>

        <div id="updateForm">
            {selectedService && (
                <form id="generalForm" onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <h3>Uppdatera tjänst</h3>
                    <label htmlFor="upd_title">Uppdatera jänsttitel:</label><br />
                    <input type="text" id="upd_title" name="upd_title" value={formValues.upd_title} 
                    onChange={handleFormChange}
                    /><br />

                    <label htmlFor="upd_description">Uppdatera beskrivning:</label><br />
                    <textarea id="upd_description" name="upd_description" value={formValues.upd_description} 
                    onChange={handleFormChange}
                    ></textarea><br />

                    <label htmlFor="upd_image">Uppdatera bild:</label><br />
                    <input type="file" id="upd_image" name="upd_image"
                    onChange={handleFormChange}
                    /><br /> 

                    <button id="saveBtn" type="submit">Spara ändringar</button>
                    <button id="cancelBtn" onClick={() => setSelectedService(null)}>Avbryt</button>
                </form>
            )}
        </div>

        </>
    )
}

export default HandleServices;