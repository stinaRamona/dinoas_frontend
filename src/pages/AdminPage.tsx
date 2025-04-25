//hemlig adminsida 
import AddNewsForm from "../components/AddNewsForm"
import AddPortfolioForm from "../components/AddPortfolioForm";
import AddServiceForm from "../components/AddServiceForm";

function AdminPage() {
  return (
    <div>
      <h1>Skyddad adminsida!</h1>
      <h2>Nyheter</h2>
      <AddNewsForm />

      <h2>Projekt till portfolio</h2>
      <AddPortfolioForm />

      <h2>Tjänster</h2>
      <AddServiceForm />
    </div>
  )
}

export default AdminPage
