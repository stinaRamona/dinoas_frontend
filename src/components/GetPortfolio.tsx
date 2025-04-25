import { useState } from "react"
import { useEffect } from "react";

const GetPortfolio = () => {

    interface Portfolio {
        project_name: string, 
        project_description: string, 
        project_picture: string,
    }

    const [projectData, setProjectData] = useState<Portfolio[]>([{project_name:"", project_description:"", project_picture: ""}]); 
    const [info, setInfo] = useState<string[]>([]); 

    const getProjects = async () => {
        try {
            const response = await fetch("http://localhost:3000/portfolio", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                setInfo(["Kunde inte hämta portfolio! Försök igen senare"]); 
            } else {
                const data = await response.json(); 
                setProjectData(data); 
            }

        } catch(error) {
            setInfo(["Kunde inte hämta portfolio! Försök igen senare"]); 
            console.log(error); 
        }
    }

    useEffect(() => {
        getProjects(); 
    }, []); 
    return (
        <>
        <div id="newsContainer">
            <h2>Nyheter just nu</h2>
            {
                projectData.map((project, index) => (
                    <article key={index} className="newsItem">
                        <h3>{project.project_name}</h3>
                        <p>{project.project_description}</p>
                        {project.project_picture && (
                            <img src={`http://localhost:3000${project.project_picture}`} alt="projektbild" />
                        )}
                    </article>
                ))
            }
            
            {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </div>
        </>
    )
}

export default GetPortfolio; 