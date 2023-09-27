import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import "./App.css";
import Cou from "./components/Cou";
import Footer from "./components/Footer";
import CuPro from "./components/CuPro";
import CuGeI from "./components/CuGeI";
import CuADI from "./components/CuADI";
import CUI from "./components/CUI";
import CuCa from "./components/CuCa";
import CuFi from "./components/CuFi";
import { getItem, setItem } from "./shared/db";

const App = () => {
  const storedAppValues = getItem("appValues");
  const localAppValues = storedAppValues || {
    branches: [
      {
        name: "Rama 1",
      },
      {
        name: "Rama 2",
      },
      {
        name: "Rama 3",
      },
    ],
  };
  const [appValues, setAppValues] = useState(localAppValues);

  useEffect(() => {
    setItem("appValues", appValues);
  }, [appValues]);

  return (
    <div className="m-5">
      <hr></hr>

      <Row>
        <Col sm={2}>
          <Form>
            <Form.Group className="m-1">
              <Form.Label>
                <strong>Cantidad de ramas (minimo 1, maximo 4)</strong>
              </Form.Label>
              <Form.Control
                type="number"
                value={appValues.branches.length}
                min={1}
                max={4}
                onChange={(e) => {
                  const newBranchesAmount = parseInt(e.target.value);
                  if (newBranchesAmount > 0 && newBranchesAmount < 5) {
                    appValues.branches = appValues.branches.slice(
                      0,
                      newBranchesAmount
                    );
                    while (appValues.branches.length < newBranchesAmount) {
                      appValues.branches.push({
                        name: `Rama ${appValues.branches.length + 1}`,
                      });
                    }
                    setAppValues(_.cloneDeep(appValues));
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <hr></hr>

      <Accordion>
        {/* Cuenta de Producción */}
        <Accordion.Item
          eventKey="0"
          style={{
            overflowX: "auto",
          }}
        >
          <Accordion.Header>
            <h1>Cuadro de Oferta y Utilización</h1>
          </Accordion.Header>
          <Accordion.Body>
            <Cou appValues={appValues} setAppValues={setAppValues} />
          </Accordion.Body>
        </Accordion.Item>
        {/* Cuenta de Generación de Ingresos */}
        <Accordion.Item
          eventKey="1"
          style={{
            overflowX: "auto",
          }}
        >
          <Accordion.Header>
            <h1>Cuenta de Producción</h1>
          </Accordion.Header>
          <Accordion.Body>
            <CuPro appValues={appValues} setAppValues={setAppValues} />
          </Accordion.Body>
        </Accordion.Item>
        {/* Cuenta de Generación de Ingresos */}
        <Accordion.Item
          eventKey="2"
          style={{
            overflowX: "auto",
          }}
        >
          <Accordion.Header>
            <h1>Cuenta de Generación de Ingresos</h1>
          </Accordion.Header>
          <Accordion.Body>
            <CuGeI appValues={appValues} setAppValues={setAppValues} />
          </Accordion.Body>
        </Accordion.Item>
        {/* Cuenta de Asignación y Distribución del Ingreso */}
        <Accordion.Item
          eventKey="3"
          style={{
            overflowX: "auto",
          }}
        >
          <Accordion.Header>
            <h1>Cuenta de Asignación y Distribución del Ingreso</h1>
          </Accordion.Header>
          <Accordion.Body>
            <CuADI appValues={appValues} setAppValues={setAppValues} />
          </Accordion.Body>
        </Accordion.Item>
        {/* Cuenta de Utilización de Ingreso */}
        {false && (
          <Accordion.Item
            eventKey="4"
            style={{
              overflowX: "auto",
            }}
          >
            <Accordion.Header>
              <h1>Cuenta de Utilización del Ingreso</h1>
            </Accordion.Header>
            <Accordion.Body>
              <CUI appValues={appValues} setAppValues={setAppValues} />
            </Accordion.Body>
          </Accordion.Item>
        )}
        {/* Cuenta de Capital */}
        {false && (
          <Accordion.Item
            eventKey="5"
            style={{
              overflowX: "auto",
            }}
          >
            <Accordion.Header>
              <h1>Cuenta de Capital</h1>
            </Accordion.Header>
            <Accordion.Body>
              <CuCa appValues={appValues} setAppValues={setAppValues} />
            </Accordion.Body>
          </Accordion.Item>
        )}
        {/* Cuenta Financiera */}
        {false && (
          <Accordion.Item
            eventKey="6"
            style={{
              overflowX: "auto",
            }}
          >
            <Accordion.Header>
              <h1>Cuenta Financiera</h1>
            </Accordion.Header>
            <Accordion.Body>
              <CuFi appValues={appValues} setAppValues={setAppValues} />
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default App;
