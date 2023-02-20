
import './NotFound.css'
import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NotFound = () => {

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center" id="notfound">
            <h2 className="fs-2 text-center"> La página que estabas buscando no existe. 😢</h2>
            <h2 className="fs-2 text-center"> Puedes volver al inicio apretando el siguiente botón</h2>
            <NavLink to="/">
                <Button className="w-100">
                    Volver al inicio
                </Button>
            </NavLink>
        </Container>
    )

}

export default NotFound ;