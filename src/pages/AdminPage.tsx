//hemlig adminsida 
import { useState } from "react";
import NewsParent from "../components/NewsParent";
import PortfolioParent from "../components/PortfolioParent";
import ServiceParent from "../components/ServiceParent";

function AdminPage() {

  //för att kunna toggla mellan vad man vill uppdatera
  const [isVisible, setIsVisible] = useState<string | null>(null);

  //toggla visning av speciellt innehåll från nyheter, portfolio och tjänster
  const toggleVisibility = (section: string) => {
    setIsVisible((prev) => (prev === section ? null : section)); 
  }; 

  return (
    <div>
      <main>
        <h1>Adminsidan</h1>
        <p>Tryck på den kategori som du vill hantera</p>

        <h2 onClick={() => toggleVisibility("news")} style={{cursor: "pointer"}}>Nyheter</h2>
        {
          isVisible === "news" && (
            <>
              <NewsParent />
            </>
          )
        }


        <h2 onClick={() => toggleVisibility("portfolio")} style={{cursor: "pointer"}}>Projekt till portfolio</h2>
        {
          isVisible === "portfolio" && (
            <>
              <PortfolioParent />
            </>
          )
        }
        

        <h2 onClick={() => toggleVisibility("services")} style={{cursor: "pointer"}}>Tjänster</h2>
        {
          isVisible === "services" && (
            <>
              <ServiceParent />
            </>
          )
        }
      </main>

    </div>
  )
}

export default AdminPage
