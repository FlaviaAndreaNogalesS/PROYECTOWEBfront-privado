import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CarreterasUsuarios.css";

const CarreterasUsuarios = () => {
  const [carreteras, setCarreteras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //obtiene las carreteras con info usuarios
    const fetchCarreteras = async () => {
      try {
        const response = await axios.get("http://localhost:3000/carreteras/con-usuarios");
        setCarreteras(response.data);
      } catch (err) {
        console.error("Error al cargar carreteras:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarreteras();
  }, []);

  if (loading) {
    return <p>Cargando carreteras...</p>;
  }

  return (
    <div className="carreteras-usuarios-container">
      <h2>Carreteras y Usuarios que Realizaron Cambios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Municipio de Origen</th>
            <th>Municipio de Destino</th>
            <th>Creado por</th>
            <th>Actualizado por</th>
          </tr>
        </thead>
        <tbody>
          {carreteras.map((carretera) => (
            <tr key={carretera.id}>
              <td>{carretera.nombre}</td>
              <td>{carretera.estado}</td>
              <td>{carretera.municipioOrigen?.nombre}</td>
              <td>{carretera.municipioDestino?.nombre}</td>
              <td>
                {carretera.creador
                  ? `${carretera.creador.nombre} (${carretera.creador.email})`
                  : "N/A"}
              </td>
              <td>
                {carretera.actualizador
                  ? `${carretera.actualizador.nombre} (${carretera.actualizador.email})`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarreterasUsuarios;
