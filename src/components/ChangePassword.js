import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Cargar usuarios desde el backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuarios");
        setUsuarios(response.data);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };

    fetchUsuarios();
  }, []);

  //manejo del envio formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (!selectedUser || !newPassword) {
        setErrorMessage("Selecciona un usuario y proporciona una nueva contraseña.");
        return;
      }

      // Llama al endpoint de cambio de contraseña
      await axios.put(`http://localhost:3000/usuarios/${selectedUser}/cambiar-contrasena`, {
        nuevaContrasena: newPassword,
      });

      setSuccessMessage("Contraseña cambiada exitosamente.");
      setNewPassword("");
      setSelectedUser("");
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      setErrorMessage("Hubo un problema al cambiar la contraseña.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Selecciona un Usuario:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} ({usuario.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;
