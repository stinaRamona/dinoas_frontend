//hemlig adminsida 
import AddPortfolioForm from "../components/AddPortfolioForm";
import AddServiceForm from "../components/AddServiceForm";
import { useState } from "react";
import NewsParent from "../components/NewsParent";

function AdminPage() {

  //för att kunna toggla mellan vad man vill uppdatera
  const [isVisible, setIsVisible] = useState<string | null>(null);

  //toggla visning av speciellt innehåll från nyheter, portfolio och tjänster
  const toggleVisibility = (section: string) => {
    setIsVisible((prev) => (prev === section ? null : section)); 
  }; 

  return (
    <div>
      <h1>Skyddad adminsida!</h1>
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
            <AddPortfolioForm />
          </>
        )
      }
      

      <h2 onClick={() => toggleVisibility("services")} style={{cursor: "pointer"}}>Tjänster</h2>
      {
        isVisible === "services" && (
          <>
            <AddServiceForm />
          </>
        )
      }
    </div>
  )
}

export default AdminPage
