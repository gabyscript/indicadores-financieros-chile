
import './Header.css';
import { Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <Container fluid id="header" className="d-flex flex-row justify-content-center align-items-center">
            <NavLink id="home-link" to="/" className="text-center">
                <h1 className="text-center">Economic Chile - Indicadores Financieros</h1> 
            </NavLink>
        </Container>
    )
}

export default Header