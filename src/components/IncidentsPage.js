import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IncidentsPage.css"; 

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Carga incidentes con información de usuarios
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/incidencias/con-usuarios");
        setIncidents(response.data);
      } catch (err) {
        setError("Error al cargar los incidentes.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return <p>Cargando incidentes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="incidents-container">
      <h1>Listado de Incidentes</h1>
      <table className="incidents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Carretera</th>
            <th>Tipo</th>
            <th>Detalle</th>
            <th>Foto</th>
            <th>Creado Por</th>
            <th>Actualizado Por</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>{incident.carretera_id}</td>
              <td>{incident.tipo}</td>
              <td>{incident.detalle}</td>
              <td>
                {incident.foto ? (
                  <img
                    src={`http://localhost:3000/${incident.foto}`}
                    alt="Foto del incidente"
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No disponible"
                )}
              </td>
              <td>
                {incident.creador
                  ? `${incident.creador.nombre} (${incident.creador.email})`
                  : "No disponible"}
              </td>
              <td>
                {incident.actualizador
                  ? `${incident.actualizador.nombre} (${incident.actualizador.email})`
                  : "No disponible"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentsPage;
