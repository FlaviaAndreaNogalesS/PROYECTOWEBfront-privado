import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SolicitudesPage.css';
import { useNavigate } from "react-router-dom";

const SolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const navigate = useNavigate();

  // obtiene las solicitudes
  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/solicitudes-incidencia");
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al cargar las solicitudes:", error);
    }
  };

  // marca una solicitud como procesada
  const handleMarkAsProcessed = async (id) => {
    await axios.patch(`http://localhost:3000/solicitudes-incidencia/${id}/process`);
    fetchSolicitudes();
  };


  useEffect(() => {
    fetchSolicitudes();
  }, []);

  //redirije a la pag incidencias
  const handleCreateIncidencia = () => {
    navigate("/incidencias");
  };

  return (
    <div className="solicitudes-container">
      <h2>Solicitudes de Incidencia</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes de incidencia pendientes.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Foto</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.detalle}</td>
                <td>
                  {solicitud.foto && (
                    <img
                      src={`http://localhost:3000/${solicitud.foto}`}
                      alt="Solicitud"
                      className="solicitud-img"
                    />
                  )}
                </td>
                <td>{solicitud.latitud}</td>
                <td>{solicitud.longitud}</td>
                <td>{solicitud.estado}</td>
                <td>
                  <button onClick={() => handleMarkAsProcessed(solicitud.id)}>
                  Procesar
                </button>
                  <button onClick={handleCreateIncidencia}>Crear Incidencia</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SolicitudesPage;
