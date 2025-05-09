//Banner för startsidan som leder till kontaktformuläret 
import { useNavigate } from "react-router-dom"
import "../css/BannerStyle.css"; 

const BannerContact = () => {
    const navigate = useNavigate(); 

    const toContactPage = () => {
        navigate("/om", {state: {targetId: "contactForm"}}); //för att scrolla direkt till kontakformuläret
    }

    return (
        <>
        <div id="bannerContainer">
            <h2>Att skapa en oas börjar med ett klick</h2>
            <button id="contactBtn" onClick={toContactPage}>Kontakta oss</button>
        </div>
        </>
    )
}

export default BannerContact
