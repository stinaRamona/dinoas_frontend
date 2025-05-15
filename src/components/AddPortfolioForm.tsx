import { useState } from "react";
import "../css/GeneralFormStyle.css"; 


const AddPortfolioForm = ({onProjectAdded} : {onProjectAdded: () => void}) => {
    interface Portfolio {
        project_name: string, 
        project_description: string, 
        file: File | null,
    }

    const [portfolioData, setPortfolioData] = useState<Portfolio>({project_name: "", project_description: "", file: null}); 
    const [info, setInfo] = useState<string[]>([]); 

    const addProject = async (e: any) => {
        e.preventDefault(); 

        //validering av formulär
        const infos = []; 

        if(!portfolioData.project_name) {
            infos.push("Du måste ange ett namn");
        }

        if(!portfolioData.project_description) {
            infos.push("Du måste ange en beskrivning"); 
        }

        if(infos.length) {
            setInfo(infos);
            return;
        }

        //gör om till FormData
        const projectBody = new FormData(); 
        projectBody.append("project_name", portfolioData.project_name); 
        projectBody.append("project_description", portfolioData.project_description); 
        if(portfolioData.file) {
            projectBody.append("file", portfolioData.file)
        }

        //lägga till nytt project
        try {
            const response = await fetch("http://localhost:3000/portfolio", {
                method: "POST", 
                body: projectBody,
            }); 

            if(!response.ok) {
                infos.push("Kunde inte lägga till projekt"); 
            }

            const data = await response.json(); 
            console.log(data);

            setInfo(["Projektet har lagts till"]); 
            setPortfolioData({project_name: "", project_description: "", file: null});
            onProjectAdded(); 
        } catch(error) {
            setInfo(["Något gick fel vid skapande av projektet. Försök igen senare"]);
            console.log(error);
        }

    }

    return (
    <>
    <h3>Lägg till ett projekt</h3>
    <form onSubmit={addProject} encType="multipart/form-data" id="generalForm">
        <label htmlFor="name">Projektnamn:</label><br />
        <input type="text" name="name" id="name" value={portfolioData.project_name}
        onChange={(e) => setPortfolioData({...portfolioData, project_name: e.target.value})}
        /><br />

        <label htmlFor="content">Information om projekt:</label><br />
        <textarea name="content" id="content" value={portfolioData.project_description} 
        onChange={(e) => setPortfolioData({...portfolioData, project_description: e.target.value})}
        ></textarea><br />

        <label htmlFor="image">Bild:</label><br />
        <input type="file" name="image" id="image" 
        onChange={(e) => setPortfolioData({...portfolioData, file: e.target.files?.[0] || null})}/>

        <input type="submit" value="Lägg till"/>
    </form> 

    {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
    </>
  )
}

export default AddPortfolioForm
