import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CarreterasPage.css";
import { useNavigate } from "react-router-dom";

const Verificador = () => {
  const navigate = useNavigate();
  const [carreteras, setCarreteras] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    municipio_origen_id: "",
    municipio_destino_id: "",
    estado: "libre",
  });
  const [editCarreteraId, setEditCarreteraId] = useState(null);

  //obtiene carreterras
  const fetchCarreteras = async () => {
    const response = await axios.get("http://localhost:3000/carreteras");
    setCarreteras(response.data);
  };

  useEffect(() => {
    fetchCarreteras();
  }, []);

  // Maneja el envío del formulario 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")); // Obtén el usuario autenticado
    if (!user || !user.id) {
      alert("Error: Usuario no autenticado.");
      return;
    }

    const userId = user.id;

    if (editCarreteraId) {
      await axios.put(
        `http://localhost:3000/carreteras/${editCarreteraId}?userId=${userId}`,
        form
      );
    } else {
      await axios.post(
        `http://localhost:3000/carreteras?userId=${userId}`,
        form
      );
    }
  
     // Reinicia el formulario
    setForm({ nombre: "", municipio_origen_id: "", municipio_destino_id: "", estado: "libre" });
    setEditCarreteraId(null);
    fetchCarreteras();
  };

  const handleEdit = (carretera) => {
    setForm(carretera);
    setEditCarreteraId(carretera.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/carreteras/${id}`);
    fetchCarreteras();
  };

  return (
    
    <div className="carreteras-container">
      <h2>Gestión de Carreteras</h2>
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
          placeholder="Municipio Origen ID"
          value={form.municipio_origen_id}
          onChange={(e) => setForm({ ...form, municipio_origen_id: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Municipio Destino ID"
          value={form.municipio_destino_id}
          onChange={(e) => setForm({ ...form, municipio_destino_id: e.target.value })}
          required
        />
        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
        >
          <option value="libre">Libre</option>
          <option value="bloqueada">Bloqueada</option>
        </select>
        <button type="submit">{editCarreteraId ? "Actualizar" : "Crear"}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Municipio Origen</th>
            <th>Municipio Destino</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carreteras.map((carretera) => (
            <tr key={carretera.id}>
              <td>{carretera.nombre}</td>
              <td>{carretera.municipio_origen_id}</td>
              <td>{carretera.municipio_destino_id}</td>
              <td>{carretera.estado}</td>
              <td>
                <button onClick={() => handleEdit(carretera)}>Editar</button>
                <button onClick={() => handleDelete(carretera.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        onClick={() => navigate("/municipios")} className="navigate-button">
          Gestion Municipios
      </button>

      <button 
        onClick={() => navigate("/solicitudes-incidencia")} className="navigate-button">
          Gestion Solicitud Incidencias
      </button>

      <button 
        onClick={() => navigate("/incidencias")} className="navigate-button">
          Gestion Incidencias
      </button>
    </div>
  );
};

export default Verificador;
