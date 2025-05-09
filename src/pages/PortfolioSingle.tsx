import { useState } from "react"; 
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import placeholder from "../assets/temp-placeholder.jpg";
import "../css/SinglePageStyle.css";

const PortfolioSingle = () => {

    interface Portfolio {
        _id: string,
        project_name: string, 
        project_description: string, 
        project_picture: string,
    }

    const {id} = useParams<{id:string}>(); 
    const [portfolioInfo, setPortfolioInfo] = useState<Portfolio>({_id: "", project_name:"", project_description: "", project_picture: ""});
    
    const getSingleProject = async () => {
    
        try {
          const response = await fetch("http://localhost:3000/portfolio/" + id, {
            method: "GET"
          }); 
    
          if(!response.ok) {
    
            console.log("fel vid hämtning av nyhet"); 
    
          } else {
    
            const data = await response.json(); 
            setPortfolioInfo(data);
    
          }
    
        } catch(error) {
          console.log(error); 
    
        }
    }

    useEffect(() => {
        getSingleProject(); 
    }, [id])

    return (
        <>
        <main>
          <div id="singleArticleContainer">
            {
              portfolioInfo.project_picture ? (
                  <img src={`http://localhost:3000${portfolioInfo.project_picture}`} alt="nyhetsbild"/>
              ) : (
                  <img src={placeholder} alt="placeholder" />
              )
            }
            <h1>{portfolioInfo.project_name}</h1>
            <article id="singleItemContent">{portfolioInfo.project_description}</article>
          </div>

    </main>
        </>
    )
}

export default PortfolioSingle
