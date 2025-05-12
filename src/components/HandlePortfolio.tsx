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
    const {data: portfolio, loading} = fetchData(`http://localhost:3000/portfolio?refreshKey=${refreshKey}`);
    const deletePortfolio = useDelete("http://localhost:3000/portfolio");
    const updatePortfolio = useUpdate("http://localhost:3000/portfolio");

    //states
    const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null); 
    const [formValues, setFormValues] = useState({title: "", description: "", image: null})

    //radering 
    const handleDelete = async (id: string) => {
        await deletePortfolio(id); 
        refreshItemList(); 
    }

    const handleUpdateBtnClick = (project: Portfolio) => {
        setSelectedProject(project); 
        setFormValues({
            title: project.project_name, 
            description: project.project_description, 
            image: null,
        })

        window.scrollTo({ left: 0, top: document.body.scrollHeight + 200, behavior: "smooth" });
    }

    const handleFormChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target; 

        setFormValues((prevValues) => ({
            ...prevValues, 
            [name]: name === "image" ? (e.target.files ? e.target.files[0] : null) : value, 
        }))
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        //om det inte finns valt projekt, avsluta
        if(!selectedProject) return; 

        //data från formulär görs till FormData
        const updatedProject = new FormData(); 
        updatedProject.append("project_name", formValues.title); 
        updatedProject.append("project_description", formValues.description);
        if(formValues.image) {
            updatedProject.append("file", formValues.image); 
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
        <div>
            <h3>Hantera postade projekt</h3>
            {portfolio.map((item: Portfolio) => (
                <article key={item._id}>
                    <h4>{item.project_name}</h4>
                    <p>{item.project_description}</p>
                    {item.project_picture && (
                        <img src={`http://localhost:3000${item.project_picture}`} alt="projektbild" />
                    )}
                    <button id="deleteBtn" onClick={() => handleDelete(item._id)}>Ta bort</button>
                    <button id="updateBtn" onClick={() => handleUpdateBtnClick(item)}>Uppdatera</button>
                </article>
            ))
            }
        </div>

        <div id="updateForm">
            {selectedProject && (
                <form id="generalForm" onSubmit={handleFormSubmit}>
                    <h3>Uppdatera projekt</h3>
                    <label htmlFor="title">Projekttitel:</label><br />
                    <input type="text" id="title" name="title" value={formValues.title}
                    onChange={handleFormChange} /><br />

                    <label htmlFor="description">Beskrivning</label><br />
                    <input type="text" id="description" name="description" value={formValues.description} 
                    onChange={handleFormChange} /><br />

                    <label htmlFor="image">Bild:</label><br />
                    <input type="file" id="image" name="image"
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