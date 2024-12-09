import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; 
import { useNavigate } from "react-router-dom";

const Admin = () => {
  
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    rol: "verificador",
  });
  const [editUserId, setEditUserId] = useState(null);

  //lista de user
  const fetchUsuarios = async () => {
    const response = await axios.get("http://localhost:3000/usuarios");
    setUsuarios(response.data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  //maneja el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editUserId) {
      await axios.put(`http://localhost:3000/usuarios/${editUserId}`, form);
    } else {
      await axios.post("http://localhost:3000/usuarios", form);
    }
    setForm({ nombre: "", email: "", contraseña: "", rol: "verificador" });
    setEditUserId(null);
    fetchUsuarios();
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
    setEditUserId(usuario.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/usuarios/${id}`);
    fetchUsuarios();
  };

  

  return (
    <div className="admin-container">
      <h2>Gestión de Usuarios</h2>
      <button
        className="change-password-button"
        onClick={() => navigate("/admin/change-password")}
      >
        Cambiar Contraseña

      </button>
      <button 
        onClick={() => navigate("/admin/carreteras-usuarios")} className="navigate-button">
          Ver Cambios en Carreteras
      </button>

      <button
        onClick={() => navigate("/admin/municipios-usuarios")}
        className="navigate-button"
      >
        Ver Cambios en Municipios
      </button>

      <button
        onClick={() => navigate("/incidentes")}
        className="navigate-button"
      >
        Ver Cambios en Incidentes
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.contraseña}
          onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
          required
        />
        <select
          value={form.rol}
          onChange={(e) => setForm({ ...form, rol: e.target.value })}
        >
          <option value="administrador">Administrador</option>
          <option value="verificador">Verificador</option>
        </select>
        <button type="submit">{editUserId ? "Actualizar" : "Crear"}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <button onClick={() => handleEdit(usuario)}>Editar</button>
                <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
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
        onClick={() => navigate("/incidencias")} className="navigate-button">
          Gestion Incidentes
      </button>

      <button 
        onClick={() => navigate("/solicitudes-incidencia")} className="navigate-button">
          Gestion Solicitud Incidencias
      </button>

    </div>
  );
};

export default Admin;
