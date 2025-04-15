import { NavLink } from "react-router-dom";

function Header() {

    return (
        <>
        <header>
            <h1>Din Oas</h1>
            <nav>
                <ul>
                    <li><NavLink to="/">Start</NavLink></li>
                    <li><NavLink to="/om">Om oss</NavLink></li>
                    <li><NavLink to="/nyheter">Nyheter</NavLink></li>
                    <li><NavLink to="/tjanster">Tjänster</NavLink></li>
                    <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                </ul>
            </nav>
        </header>
        </>
    )
}

export default Header; 