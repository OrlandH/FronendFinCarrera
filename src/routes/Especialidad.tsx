import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import { AuthResponse, AuthResponseError } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Especialidad() {
  const auth = useAuth();
  const goTo = useNavigate();
  
  const [errorResponse, setErrorResponse] = useState("");


  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

 
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const accessToken = auth.getAccessToken();
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/especialidad/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, },
        body: JSON.stringify({codigo, nombre, descripcion }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setCodigo("");
        setNombre("");
        setDescripcion("");
        goTo("/especialidad");
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
        <h1>Crear Nueva Especialidad</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Codigo de Especialidad</label>
        <input
          name="codigo"
          type="text"
          onChange={(e) => setCodigo(e.target.value)}
          value={codigo}
        />
        <label>Nombre de Especialidad:</label>
        <input
          name="nombre"
          type="text"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
        />
        <label>Descripcion:</label>
        <input
          name="descripcion"
          type="text"
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
        />
        <button>Crear</button>
      </form>
      </div>
      <div className="dashboard">
        <h1>Especialidades Disponibles</h1>
        <div>
        <h2 className="font-black text-4xl text-gray-500"></h2>
        <hr className="my-4" />
        <p className="mb-8">
        </p>
      </div>
      </div>
    </PortalLayout>
  );
}
