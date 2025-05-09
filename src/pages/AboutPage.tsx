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
        <p>Lite text hihihihihih Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ipsam animi ut quas doloremque, alias illum enim, tenetur doloribus minus impedit amet consequuntur neque veritatis est cum, distinctio id facere.</p>
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
