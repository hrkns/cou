import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import "./App.css";
import Cou from "./components/Cou";
import Footer from "./components/Footer";
import CuPro from "./components/CuPro";
import CuGeI from "./components/CuGeI";
import CuADI from "./components/CuADI";
import CUI from "./components/CUI";
import CuCa from "./components/CuCa";
import CuFi from "./components/CuFi";

const App = () => {
  const localAppValues = (localStorage.getItem("cou_appValues") &&
    JSON.parse(localStorage.getItem("cou_appValues"))) || {
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
    useThirdBranch: true,
    useGov: true,
  };
  const [appValues, setAppValues] = useState(localAppValues);

  useEffect(() => {
    localStorage.setItem("cou_appValues", JSON.stringify(appValues));
  }, [appValues]);

  return (
    <div className="m-5">
      <Accordion>
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
      </Accordion>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default App;
