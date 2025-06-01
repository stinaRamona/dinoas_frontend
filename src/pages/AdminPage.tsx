//hemlig adminsida 
import { useState } from "react";
import NewsParent from "../components/NewsParent";
import PortfolioParent from "../components/PortfolioParent";
import ServiceParent from "../components/ServiceParent";
import "../css/AdminPage.css"; 

function AdminPage() {

  //för att kunna toggla mellan vad man vill uppdatera
  const [isVisible, setIsVisible] = useState<string | null>("news"); 

  //toggla visning av speciellt innehåll från nyheter, portfolio och tjänster
  const toggleVisibility = (section: string) => {
    setIsVisible((prev) => (prev === section ? null : section)); 
  }; 

  return (
    <div>
      <main> 
          <h1>Välkommen till adminsidan</h1>
          <p style={{maxWidth: "40em"}}>
            Här kan du lägga till och hantera innehåll för kategorierna Nyheter, Portfolio och Tjänster. Tryck på den rubriken du vill hantera för att få fram administrationsvyn. 
            Vill du ändra någon annan del av webbplatsen? Kontakta webbutvecklare <a href="mailto:stinarpersson@gmail.com">Stina Persson.</a> 
          </p>
          <div id="adminCategoryContainer">
            <div className="adminCategoryItem">
              <h2 onClick={() => toggleVisibility("news")} 
              style={{cursor: "pointer",
              ...(isVisible === "news" ? {backgroundColor: "#fff1c4", padding: "0.25em", borderRadius: "5px"} : {}),}}>Nyheter</h2>
              {
                isVisible === "news" && (
                  <>
                    <NewsParent />
                  </>
                )
              }
            </div>

            <div className="adminCategoryItem">
              <h2 onClick={() => toggleVisibility("portfolio")} 
              style={{cursor: "pointer", 
              ...(isVisible === "portfolio" ? {backgroundColor: "#fff1c4", padding: "0.25em", borderRadius: "5px"} : {}),}}>Portfolio</h2>
              {
                isVisible === "portfolio" && (
                  <>
                    <PortfolioParent />
                  </>
                )
              }
            </div>

            <div className="adminCategoryItem">
              <h2 onClick={() => toggleVisibility("services")} 
              style={{cursor: "pointer", 
              ...(isVisible === "services" ? {backgroundColor: "#fff1c4", padding: "0.25em", borderRadius: "5px"} : {}),}}>Tjänster</h2>
              {
                isVisible === "services" && (
                  <>
                    <ServiceParent />
                  </>
                )
              }
            </div>

          </div>
      </main>

    </div>
  )
}

export default AdminPage
