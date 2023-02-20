

import './Graphs.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

import { useParams, NavLink } from "react-router-dom";

import { RingLoader } from 'react-spinners';

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts";

const Graphs = () => {

    const {id} = useParams();
    const [data, setData] = useState();
    const [actualValue, setActualValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [minValue, setMinValue] = useState();
    const [conversion, setConversion] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const [convertionTotal, setConvertionTotal] = useState();
    const [loading, setLoading] = useState(false);

    const loadPage = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }   
    const getGraphData = async () => {
        try {
            const response = await axios.get('https://mindicador.cl/api/' + `${id}`);
            const descendingData = await response.data.serie;
            const ascendingData = await descendingData.sort(function(a,b){
                if (a.fecha < b.fecha) {
                    return -1;
                }
            })
            let graphArray = [];
            ascendingData?.map(e => {
                let infoObject = {
                    name: e.fecha,
                    valores: e.valor
                }                    
                graphArray.push(infoObject)
                return graphArray;
            })
            setData(graphArray);
            
            const poppedData = graphArray.pop(); 
                                
            setActualValue(poppedData.valores);  

            let min = Math.min(...data.map( o => o.valores));
            let max = Math.max(...data.map( u => u.valores));

            setMinValue(min);
            setMaxValue(max)
            
            if (id === 'uf' || id === 'ivp' || id ==='dolar' || id === 'euro' || id === 'utm' || id === 'libra_cobre' || id === 'bitcoin'){
                setConversion(true)
            }
            if (id === 'tpm' || id === 'imacec' || id ==='ipc' || id === 'tasa_desempleo'){
                setConversion(false)
            }
        } catch (error) {
            console.log(error);                
        }
    }

    useEffect(() => {
        loadPage()
    }, [])

    useEffect(() => {
        if (quantity < 0) {
            setQuantity(0)
        }
        setConvertionTotal(Math.floor(quantity * actualValue))

        getGraphData()
    }, [data, id, convertionTotal, quantity, actualValue]);

    const captureNumber = async (e) => {
        setQuantity(Number(e.target.value))
    }

    return (
        <>
            {
                loading ?
                <Container fluid className="d-flex flex-row justify-content-center align-items-center" id="loading-container">
                    <RingLoader 
                    size={150}
                    color={"#0f4c81"}
                    loading={loading}/>
                </Container>
                : <> {conversion? 
                    <Container fluid>
                        <Row className="justify-content-center align-items-center">
                            <Col className="g-3 justify-content-center align-items-center">
                                <h2 className="text-center">Gráficas y herramientas</h2>
                            </Col>
                        </Row>
                        <Row className="justify-content-center align-items-center"> 
                            <Col xs={12} sm={12} md={12} lg={4} xl={{span:3, offset:1}} className="g-3 d-flex flex-column justify-content-evenly align-items-center">
                                <Card id="cards" className="h-100 w-100 p-2 d-flex justify-content-evenly align-items-center">
                                    <Card.Title id="card-title" className="fs-5 bold text-center">
                                            Información sobre {id}
                                    </Card.Title>
                                    <Card.Text id="card-text" className="fs-5 text-center">
                                        Valor {id} actual: ${actualValue} 
                                    </Card.Text>
                                    <Card.Text id="card-text" className="fs-5 text-center">
                                        Valor {id} mínimo: ${minValue} 
                                    </Card.Text>
                                    <Card.Text id="card-text" className="fs-5 text-center">
                                        Valor {id} máximo: ${maxValue} 
                                    </Card.Text>
                                    <Form className="d-flex flex-column justify-content-evenly align-items-center">
                                        <Form.Group >
                                            <Form.Label className="fs-5 text-center"> Indique la cantidad de {id} a calcular </Form.Label>
                                            <Form.Control type="number" min="1" value={quantity} onChange={captureNumber} />
                                        </Form.Group>
                                        <Card.Text id="card-text" className="fs-5 pt-3 text-center">
                                            Valor total: ${convertionTotal}
                                        </Card.Text>
                                    </Form>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={8} xl={8} className="g-3 d-flex flex-column justify-content-evenly align-items-center">
                                <ResponsiveContainer width="100%" height={500} debounce={1}>
                                    <LineChart width="100%" height="100%" data={data} margin={{top:5, right: 10, left: -10, bottom: 5}} id="graphs">
                                        <CartesianGrid strokeDasharray={1} />
                                        <XAxis dataKey="name" domain={['dataMin', 'dataMax']}/>
                                        <YAxis type="number" scale='linear' domain={[dataMin => (0 - 20), dataMax => (dataMax * 1.35)]}/>
                                        <Tooltip />
                                        <Legend />                    
                                        <Line type="monotone" dataKey="valores" stroke="#010101" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>  
                            </Col>
                        </Row>
                    </Container>
                    : <Container fluid>
                        <Row className="justify-content-center align-items-center">
                            <Col className="g-3 justify-content-center align-items-center">
                                <h2 className="text-center">Gráfica de las últimas 30 mediciones </h2>
                            </Col>
                        </Row>
                        <Row className="justify-content-start align-items-center">
                            <Col xs={12} sm={12} md={12} lg={4} xl={{span:3, offset:1}} className="g-3 d-flex flex-column justify-content-evenly align-items-center">
                                <Card id="cards" className="h-100 w-100 p-2 d-flex justify-content-evenly align-items-center">
                                    <Card.Title id="card-title" className="fs-5 bold text-center">
                                            Información sobre {id}
                                    </Card.Title>
                                    <Card.Text id="card-text" className="fs-5 text-center">
                                        Valor {id} actual: {actualValue} %
                                    </Card.Text>
                                    <Card.Text id="card-text" className="fs-5 text-center">
                                        Valor {id} mínimo: {minValue} %
                                    </Card.Text>
                                    <Card.Text id="card-text" className="fs-5 text-center">
                                        Valor {id} máximo: {maxValue} %
                                    </Card.Text>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={8} xl={8} className="justify-content-start align-items-center">
                                <ResponsiveContainer width="100%" height={600} debounce={1}>
                                    <LineChart width="100%" height="100%" data={data} margin={{top:5, right: 10, left: -35, bottom: 5}} id="graphs">
                                        <CartesianGrid strokeDasharray={1} />
                                        <XAxis dataKey="name" domain={['dataMin', 'dataMax']}/>
                                        <YAxis type="number" scale='linear' domain={[dataMin => (0 - 20), dataMax => (dataMax * 1.35)]}/>
                                        <Tooltip />
                                        <Legend />                    
                                        <Line type="monotone" dataKey="valores" stroke="#010101" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                    </Container> }
                    <Container fluid className="h-75 p-2 d-flex justify-content-center align-items-center">
                        <NavLink to="/">
                                <Button className="w-100">
                                    Volver al inicio
                                </Button>
                        </NavLink>
                    </Container>  
                </>  }
        </>
    )
}

export default Graphs