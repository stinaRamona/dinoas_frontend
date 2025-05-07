import ContactForm from "../components/ContactForm"
import BannerQuote from "../components/BannerQuote";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function AboutPage() {

  const { state } = useLocation(); 
  const { targetId } = state || {}; 

  //scrollar till formuläret ifall man klickat på knapp från startsidan
  useEffect(() => {
    const el = document.getElementById(targetId); 

    if(el) {
      el.scrollIntoView({behavior: "smooth"});
    }
  }, [targetId]); 

  return (
    <div>
        <h1>Om oss</h1>
        <p>Lite text hihihihihih Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ipsam animi ut quas doloremque, alias illum enim, tenetur doloribus minus impedit amet consequuntur neque veritatis est cum, distinctio id facere.</p>
        <BannerQuote />
        <h2>Vårat gäng</h2>
        <p>Dom som jobbar på företaget! Med ord och bild</p>
        <div id="contactForm">
          <ContactForm/>
        </div>
        
    </div>
  )
}

export default AboutPage
