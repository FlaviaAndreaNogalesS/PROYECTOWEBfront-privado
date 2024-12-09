import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MunicipiosUsuarios.css";

const MunicipiosUsuarios = () => {
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);

  //municipios junto con los usuarios
  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/municipios/con-usuarios");
        setMunicipios(response.data);
      } catch (err) {
        console.error("Error al cargar municipios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMunicipios();
  }, []);

  if (loading) {
    return <p>Cargando municipios...</p>;
  }

  return (
    <div className="municipios-usuarios-container">
      <h2>Municipios y Usuarios que Realizaron Cambios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Creado por</th>
            <th>Actualizado por</th>
          </tr>
        </thead>
        <tbody>
          {municipios.map((municipio) => (
            <tr key={municipio.id}>
              <td>{municipio.nombre}</td>
              <td>{municipio.latitud}</td>
              <td>{municipio.longitud}</td>
              <td>
                {municipio.creador
                  ? `${municipio.creador.nombre} (${municipio.creador.email})`
                  : "N/A"}
              </td>
              <td>
                {municipio.actualizador
                  ? `${municipio.actualizador.nombre} (${municipio.actualizador.email})`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MunicipiosUsuarios;
