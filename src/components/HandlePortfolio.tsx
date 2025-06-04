//för att hantera portfolio (Uppdatera och radera)
import React, { useState } from "react";
import useDelete from "../hooks/useDelete";
import useUpdate from "../hooks/useUpdate";
import fetchData from "../hooks/fetchData";
import "../css/HandleItemStyle.css"; 
import "../css/GeneralFormStyle.css"; 

const HandlePortfolio = ({refreshKey, refreshItemList} : {refreshKey : number; refreshItemList : () => void}) => {
    
    interface Portfolio {
        _id: string, 
        project_name: string, 
        project_description: string,
        project_picture: string,
    }; 

    //hooks
    const {data: portfolio, loading} = fetchData(`https://din-oas-api.onrender.com/portfolio?refreshKey=${refreshKey}`);
    const deletePortfolio = useDelete("https://din-oas-api.onrender.com/portfolio");
    const updatePortfolio = useUpdate("https://din-oas-api.onrender.com/portfolio");

    //states
    const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null); 
    const [formValues, setFormValues] = useState({upd_title: "", upd_description: "", upd_image: null})

    //radering 
    const handleDelete = async (id: string) => {
        if(!window.confirm("Är du säker på att du vill ta bort detta projekt?")) {
            return; //avbryter om användaren inte bekräftar
        }
        await deletePortfolio(id); 
        refreshItemList(); 
    }

    const handleUpdateBtnClick = (project: Portfolio) => {
        setSelectedProject(project); 
        setFormValues({
            upd_title: project.project_name, 
            upd_description: project.project_description, 
            upd_image: null,
        })

        window.scrollTo({ left: 0, top: document.body.scrollHeight + 200, behavior: "smooth" });
    }

    const handleFormChange =(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value} = e.target; 

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: name === "upd_image" && e.target instanceof HTMLInputElement
                ? (e.target.files ? e.target.files[0] : null)
                : value,
        }));
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        //om det inte finns valt projekt, avsluta
        if(!selectedProject) return; 

        //data från formulär görs till FormData
        const updatedProject = new FormData(); 
        updatedProject.append("project_name", formValues.upd_title); 
        updatedProject.append("project_description", formValues.upd_description);
        if(formValues.upd_image) {
            updatedProject.append("file", formValues.upd_image); 
        }

        //datan skickas till hooken för uppdatering
        await updatePortfolio(selectedProject._id, updatedProject);
        
        //valt projekt sätts till null och listan uppdateras
        setSelectedProject(null); 
        refreshItemList(); 
    }

    if(loading) {
        return <p>Laddar in projekt...</p> //KOM IHåG ATT ÄNDRA TILL SPINNER
    }

    return (
        <>
        <div id="handleItemContainer">
            <h3>Hantera postade projekt</h3>
            {portfolio.map((item: Portfolio) => (
                <article key={item._id}>
                    <h4>{item.project_name}</h4>
                    <p>{item.project_description}</p>
                    {item.project_picture && (
                        <img src={`https://din-oas-api.onrender.com${item.project_picture}`} alt="projektbild" />
                    )}
                    <button id="deleteBtn" onClick={() => handleDelete(item._id)}>Ta bort</button>
                    <button id="updateBtn" onClick={() => handleUpdateBtnClick(item)}>Uppdatera</button>
                </article>
            ))
            }
        </div>

        <div id="updateForm">
            {selectedProject && (
                <form id="generalForm" onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <h3>Uppdatera projekt</h3>
                    <label htmlFor="upd_title">Uppdatera projekttitel:</label><br />
                    <input type="text" id="upd_title" name="upd_title" value={formValues.upd_title}
                    onChange={handleFormChange} /><br />

                    <label htmlFor="upd_description">Uppdatera beskrivning</label><br />
                    <textarea id="upd_description" name="upd_description" value={formValues.upd_description} 
                    onChange={handleFormChange}
                    ></textarea><br />

                    <label htmlFor="upd_image">Uppdatera bild:</label><br />
                    <input type="file" id="upd_image" name="upd_image"
                    onChange={handleFormChange} /><br />
                    
                    <button id="saveBtn" type="submit">Spara ändringar</button>
                    <button id="cancelBtn" onClick={() => setSelectedProject(null)}>Avbryt</button>
                </form>
            )}
        </div>

        </>
    )
}
export default HandlePortfolio;