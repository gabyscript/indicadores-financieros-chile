

import './Main.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

    const [economicData, setEconomicData] = useState();
    
    const navigate = useNavigate();

    

    useEffect(() => {
       
        const getData = async () => {
            try {
                const response = await axios.get('https://mindicador.cl/api');
                const arrayResponse = await Object.values(response.data);
                const slicedData = await arrayResponse.slice(3,15);
                const splicedData = await slicedData.splice(3,1);
                setEconomicData(slicedData);
            } catch (error) {
                console.log(error);
            }
        }
        getData()
        
    }, [])

    return(
        <Container fluid id="main-container">
            <Row className='p-3 justify-content-center align-items-center'>
            {economicData?.map((singleEconomicData, dataKey) => {
                return (
                    <Col key={dataKey} xs={12} sm={6} md={8} lg={6} xl={4} className="g-5">
                        <Card id="cards" className="h-100 p-2 d-flex justify-content-center align-items-center" values={singleEconomicData.codigo}>
                            <Card.Body className="h-100 d-flex flex-column justify-content-center align-items-center">
                                <Card.Title id="card-title" className="bold text-center">
                                    {singleEconomicData.nombre}
                                </Card.Title>
                            </Card.Body>
                            <Card.Text id="card-text" className="text-center">
                                Valor actual: {singleEconomicData.valor} {singleEconomicData.unidad_medida}
                            </Card.Text>
                            <Card.Text id="card-text" className="text-center">
                                Fecha de última medición: {singleEconomicData.fecha}
                            </Card.Text>
                            <Button id="graphs-btn" onClick={() => {
                                navigate(`info/${singleEconomicData.codigo}`)
                            }} > Ver gráficos </Button>
                        </Card>                    
                    </Col>
                    )
                } 
            )}
            </Row>
        </Container>
    )
}

export default MainPage;