
import './Footer.css'
import {Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {

    return (

        <Container fluid className="d-flex flex-column justify-content-evenly align-items-center" id="footer">
            <Container id="icons-container" className="w-25 d-flex flex-row justify-content-evenly align-items-center">
                <a href="https://www.linkedin.com/in/gabrielpreller/" target="__BLANK">
                    <FontAwesomeIcon icon={['fab', 'linkedin']} size="2x" color="white" id="icons" fixedWidth />
                </a>
                <a href="https://github.com/gabyscript" target="__BLANK">
                    <FontAwesomeIcon icon={['fab', 'github']} size="2x" color="white" id="icons" fixedWidth />
                </a>
            </Container>
            <h5 className="text-center"> 2023 - Página creada por GabyScript</h5>
        </Container>

    )
}

export default Footer