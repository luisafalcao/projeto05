// import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom"; // Import Outlet
import { useParams } from "react-router-dom";
import "./Layout.css"
import Navbar from "../components/Navbar";

export default function Idioma() {
    const id = useParams();
    const idiomaSelecionado = id.id

    return (
        <>
            <div className="nav-wrapper">
                <Navbar idiomaSelecionado={idiomaSelecionado} />
                <p>{idiomaSelecionado}</p>
            </div>

            <Outlet />
        </>
    );
}