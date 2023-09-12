import React from "react";
import "./App.css";
import Cou from "./components/Cou";

const App = () => {
  return (
    <div>
      <Cou />
      <footer className="custom-footer">
        <span>Versión: 0.1.1</span>
        &nbsp;
        <span>|</span>
        &nbsp;
        <span><a href="https://www.linkedin.com/in/jrosendo/" target="_blank">Creador</a></span>
      </footer>
    </div>
  );
};

export default App;
