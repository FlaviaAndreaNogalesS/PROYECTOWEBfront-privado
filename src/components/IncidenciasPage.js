import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IncidenciasPage.css";
import { useNavigate } from "react-router-dom";

const IncidenciasPage = () => {
const navigate = useNavigate();
  const [incidencias, setIncidencias] = useState([]);
  const [blockedRoutes, setBlockedRoutes] = useState([]);
  const [form, setForm] = useState({
    carretera_id: "",
    tipo: "Transitable con desvios y/o horarios de circulación",
    detalle: "",
    foto: null,
  });
  const [editId, setEditId] = useState(null);

  //carga incidentes
  const fetchIncidencias = async () => {
    const response = await axios.get("http://localhost:3000/incidencias");
    setIncidencias(response.data);
  };

  //carretrras bloqueadas
  const fetchBlockedRoutes = async () => {
    const response = await axios.get(
      "http://localhost:3000/incidencias/blocked-routes"
    );
    setBlockedRoutes(response.data);
  };

  useEffect(() => {
    fetchIncidencias();
    fetchBlockedRoutes();
  }, []);

  const handleFileChange = (e) => {
    setForm({ ...form, foto: e.target.files[0] });
  };

  //maneja la crearcion o edicion
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      alert("Usuario no autenticado");
      return;
    }

    const formData = new FormData();
    formData.append("carretera_id", form.carretera_id);
    formData.append("tipo", form.tipo);
    formData.append("detalle", form.detalle);
    if (form.foto) {
      formData.append("foto", form.foto);
    }

    if (editId) {
      await axios.put( //actualiza
        `http://localhost:3000/incidencias/${editId}?userId=${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      await axios.post( //crea
        `http://localhost:3000/incidencias?userId=${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    //Resetea el formulario
    setForm({
      carretera_id: "",
      tipo: "Transitable con desvios y/o horarios de circulación",
      detalle: "",
      foto: null,
    });
    setEditId(null);
    fetchIncidencias();
  };

  //manejo de edit y delete
  const handleEdit = (incidencia) => {
    setForm({
      carretera_id: incidencia.carretera_id,
      tipo: incidencia.tipo,
      detalle: incidencia.detalle,
      foto: null,
    });
    setEditId(incidencia.id);
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      alert("Usuario no autenticado");
      return;
    }

    await axios.delete(`http://localhost:3000/incidencias/${id}?userId=${userId}`);
    fetchIncidencias();
  };

  return (
    <div className="incidencias-container">
      <h2>Gestión de Incidencias</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={form.carretera_id}
          onChange={(e) => setForm({ ...form, carretera_id: e.target.value })}
          required
        >
          <option value="">Selecciona una carretera bloqueada</option>
          {blockedRoutes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.nombre}
            </option>
          ))}
        </select>
        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="Transitable con desvios y/o horarios de circulación">
            Transitable con desvios y/o horarios de circulación
          </option>
          <option value="No transitable por conflictos sociales">
            No transitable por conflictos sociales
          </option>
          <option value="Restricción vehicular">Restricción vehicular</option>
          <option value="No transitable tráfico cerrado">
            No transitable tráfico cerrado
          </option>
          <option value="Restricción vehicular, especial">
            Restricción vehicular, especial
          </option>
        </select>
        <textarea
          placeholder="Detalle"
          value={form.detalle}
          onChange={(e) => setForm({ ...form, detalle: e.target.value })}
          required
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>

      <h3>Listado de Incidencias</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Carretera</th>
            <th>Tipo</th>
            <th>Detalle</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.map((incidencia) => (
            <tr key={incidencia.id}>
              <td>{incidencia.id}</td>
              <td>{incidencia.carretera_id}</td>
              <td>{incidencia.tipo}</td>
              <td>{incidencia.detalle}</td>
              <td>
                <button onClick={() => handleEdit(incidencia)}>Editar</button>
                <button onClick={() => handleDelete(incidencia.id)}>Eliminar</button>
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

export default IncidenciasPage;
