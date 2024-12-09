import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Admin from "./components/Admin";
import Verificador from "./components/Veificador";
import CarreterasUsuarios from "./components/CarreterasUsuarios";
import ChangePassword from "./components/ChangePassword";
import IncidentsPage from "./components/IncidentsPage.js";
import MunicipiosPage from "./components/MunicipiosPage.js";
import MunicipiosUsuarios from "./components/MunicipiosUsuarios.js"
import IncidenciasPage from "./components/IncidenciasPage.js";
import SolicitudesPage from "./components/SolicitudesPage.js";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />
        <Route path="/verificador" element={<Verificador />} />
        <Route path="/admin/carreteras-usuarios" element={<CarreterasUsuarios />} />
        <Route path="/admin/municipios-usuarios" element={<MunicipiosUsuarios />} />
        <Route path="/incidentes" element={<IncidentsPage />} />
        <Route path="/municipios" element={<MunicipiosPage />} />
        <Route path="/incidencias" element={<IncidenciasPage />} />
        <Route path="/solicitudes-incidencia" element={<SolicitudesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
