import "../css/Footer.css"; 
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="footerInfo">
          <p>Adressgatan 20</p>
          <p>587 33 Linköping</p>
          <p><NavLink to="/login" style={{color: "#fffcf2"}}>Admin login</NavLink></p>
        </div>

        <div className="footerInfo">
          <p><i className="fa-brands fa-instagram"></i> dinoas</p>
          <p><i className="fa-brands fa-facebook"></i> dinoas</p>
        </div>

        <div className="footerInfo">
          <p>kontakt@dinoas.se</p>
          <p>0707525262</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
