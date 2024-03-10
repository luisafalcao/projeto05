import { NavLink } from "react-router-dom"
import "./Navbar.css"

export default function Navbar({ idiomaSelecionado }) {
    return (
        <nav className="page-nav">
            <ul>
                <li><NavLink to={`/idioma/${idiomaSelecionado}/gramatica`}>Gramática</NavLink></li>
                <li><NavLink to={`/idioma/${idiomaSelecionado}/vocabulario`} pagina="vocabulario">Vocabulário</NavLink></li>
                <li><NavLink to={`/idioma/${idiomaSelecionado}/verbos`} pagina="verbos">Verbos</NavLink></li>
            </ul>
        </nav>
    )
}