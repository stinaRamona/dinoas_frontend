import { NavLink } from "react-router-dom";
import Wave from "../assets/mörkgrönWave.svg"; 
import "../css/Header.css"; 
import { useAuth } from "../context/AuthContext";

function Header() {

    const {user, logout} = useAuth(); 

    return (
        <>
        <header>
            <div id="logoWrapper">
                <h1>Din Oas</h1>
            </div>

            {/*Om man är på adminsidan (alltså inloggad) Döls den vanliga navigationen och man kan logga ut istället */}
            {
                !user ? 
            <ul>
                <li><NavLink className="nav-link" to="/">Start</NavLink></li>
                <li><NavLink className="nav-link" to="/om">Om oss</NavLink></li>
                <li><NavLink className="nav-link" to="/nyheter">Nyheter</NavLink></li>
                <li><NavLink className="nav-link" to="/tjanster">Tjänster</NavLink></li>
                <li><NavLink className="nav-link" to="/portfolio">Portfolio</NavLink></li>
            </ul> : 

            <button id="logOutBtn" onClick={logout}>Logga ut</button>
            }
        </header>
        <img src={Wave} alt="mörkgrön våg" id="headerWave" />
        </>
    )
}

export default Header; 