import ContactForm from "../components/ContactForm";
import BannerQuote from "../components/BannerQuote";
import Employees from "../components/Employees";;
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
      <main>
        <h1 style={{textAlign: "center"}}>Om oss</h1>
        <p style={{maxWidth: "40em", margin: "0 auto", marginBottom: "5%"}}>Din Oas är det nya, moderna trädgårdsföretaget som kombinerar hållbarhet med passion för växtliv. Vi erbjuder skräddarsydda trädgårdslösningar, innovativa odlingskoncept och rådgivning för att skapa gröna oaser oavsett om det gäller din balkong, trädgård eller kontorsmiljö.</p>
      </main>    

      <BannerQuote />

      <main>
        <Employees />
      </main>

      <div id="contactForm">
        <ContactForm/>
      </div>

      <style>{`
        h1 {
            text-align: center;
        }
      `}</style>
        
    </div>
  )
}

export default AboutPage
