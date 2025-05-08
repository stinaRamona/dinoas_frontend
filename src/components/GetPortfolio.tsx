import { useState } from "react";
import { useEffect } from "react";
import "../css/AltTwoColumnLayout.css";
import { useNavigate } from "react-router-dom"; 

const GetPortfolio = () => {

    interface Portfolio {
        _id: string,
        project_name: string, 
        project_description: string, 
        project_picture: string,
    }

    const navigate = useNavigate(); 
    const [projectData, setProjectData] = useState<Portfolio[]>([{_id: "", project_name:"", project_description:"", project_picture: ""}]); 
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

    const goToSingleProject = (id: string) => {
        navigate("/project/" + id);
    };

    useEffect(() => {
        getProjects(); 
    }, []); 

    return (
        <>
        <div id="projectContainer">
            {
                projectData.map((project, index) => (
                    <article key={index} className="projectItem">
                        <div className="projectText" onClick={() => goToSingleProject(project._id)}>
                            <h2>{project.project_name}</h2>
                            <p>{project.project_description}</p>
                        </div>

                        <div className="projectImg">
                            {project.project_picture && (
                                <img src={`http://localhost:3000${project.project_picture}`} alt="projektbild" />
                            )}
                        </div>
                    </article>
                ))
            }
            
            {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </div>
        </>
    )
}

export default GetPortfolio; 