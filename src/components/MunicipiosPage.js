import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MunicipiosPage.css";
import { useNavigate } from "react-router-dom";

const MunicipiosPage = () => {
  const navigate = useNavigate();
  const [municipios, setMunicipios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    latitud: "",
    longitud: "",
  });
  const [editMunicipioId, setEditMunicipioId] = useState(null);
  const fetchMunicipios = async () => {
    const response = await axios.get("http://localhost:3000/municipios");
    setMunicipios(response.data);
  };

  useEffect(() => {
    fetchMunicipios();
  }, []);

   //formulario para crear o actualizar municipios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")); // Obtener el usuario autenticado
    if (!user || !user.id) {
      alert("Error: Usuario no autenticado.");
      return;
    }

    const userId = user.id; //obtiene el id user

    if (editMunicipioId) {
      await axios.put(
        `http://localhost:3000/municipios/${editMunicipioId}?userId=${userId}`,
        form
      );
    } else {
      await axios.post(
        `http://localhost:3000/municipios?userId=${userId}`,
        form
      );
    }

    // Reinicia el formulario 
    setForm({ nombre: "", latitud: "", longitud: "" });
    setEditMunicipioId(null);
    fetchMunicipios();
  };

  const handleEdit = (municipio) => {
    setForm(municipio);
    setEditMunicipioId(municipio.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/municipios/${id}`);
    fetchMunicipios();
  };

  return (
    <div className="municipios-container">
      <h2>Gestión de Municipios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.000001"
          placeholder="Latitud"
          value={form.latitud}
          onChange={(e) => setForm({ ...form, latitud: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.000001"
          placeholder="Longitud"
          value={form.longitud}
          onChange={(e) => setForm({ ...form, longitud: e.target.value })}
          required
        />
        <button type="submit">{editMunicipioId ? "Actualizar" : "Crear"}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {municipios.map((municipio) => (
            <tr key={municipio.id}>
              <td>{municipio.nombre}</td>
              <td>{municipio.latitud}</td>
              <td>{municipio.longitud}</td>
              <td>
                <button onClick={() => handleEdit(municipio)}>Editar</button>
                <button onClick={() => handleDelete(municipio.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        onClick={() => navigate("/incidencias")} className="navigate-button">
          Gestion Incidentes
      </button>

      <button 
        onClick={() => navigate("/verificador")} className="navigate-button">
          Gestion Carreterras
      </button>

      <button 
        onClick={() => navigate("/solicitudes-incidencia")} className="navigate-button">
          Gestion Solicitud Incidencias
      </button>
      
    </div>
  );
};

export default MunicipiosPage;
