import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import { AuthResponse, AuthResponseError } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";


export default function Pacientes() {
  const auth = useAuth();
  const goTo = useNavigate();
  
  const [errorResponse, setErrorResponse] = useState("");


  const [username, setUsername] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNac, setFecha] = useState("");
  const [genero, setGenero] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

 
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const accessToken = auth.getAccessToken();
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/pacientes/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, },
        body: JSON.stringify({ username, apellido, cedula, fechaNac, genero, ciudad, direccion, telefono, email }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setUsername("");
        setApellido("");
        setCedula("");
        setFecha("");
        setGenero("");
        setCiudad("");
        setDireccion("");
        setTelefono("");
        setEmail("");
        goTo("/pacientes");
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PortalLayout>
      <div className="dashboard">
        <form onSubmit={handleSubmit} className="form">
        <h1>Crear Nuevo Paciente</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Nombre</label>
        <input
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Apellido</label>
        <input
          name="apellido"
          type="text"
          onChange={(e) => setApellido(e.target.value)}
          value={apellido}
        />
        <label>Cedula</label>
        <input
          name="cedula"
          type="text"
          onChange={(e) => setCedula(e.target.value)}
          value={cedula}
        />
        <label>Fecha Nacimiento</label>
        <input
          name="fechaNac"
          type="text"
          onChange={(e) => setFecha(e.target.value)}
          value={fechaNac}
        />
        <label>Genero</label>
        <input
          name="genero"
          type="text"
          onChange={(e) => setGenero(e.target.value)}
          value={genero}
        />
        <label>Ciudad</label>
        <input
          name="ciudad"
          type="text"
          onChange={(e) => setCiudad(e.target.value)}
          value={ciudad}
        />
        <label>Direccion</label>
        <input
          name="direccion"
          type="text"
          onChange={(e) => setDireccion(e.target.value)}
          value={direccion}
        />
        <label>Telefono</label>
        <input
          name="telefono"
          type="text"
          onChange={(e) => setTelefono(e.target.value)}
          value={telefono}
        />
        <label>Email</label>
        <input
          name="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button>Crear</button>
      </form>
      </div>
      <div className="dashboard">
        <h1>Pacientes Registrados</h1>
      </div>
    </PortalLayout>
  );
}
