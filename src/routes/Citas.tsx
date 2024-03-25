import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import { AuthResponse, AuthResponseError } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Citas() {
  const auth = useAuth();
  const goTo = useNavigate();
  
  const [errorResponse, setErrorResponse] = useState("");


  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id_paciente, setIdPaciente] = useState("");
  const [id_especialidad, setIdEspecialidad] = useState("");

 
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const accessToken = auth.getAccessToken();
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/citas/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, },
        body: JSON.stringify({codigo, descripcion, id_paciente, id_especialidad}),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setCodigo("");
        setDescripcion("");
        setIdPaciente("");
        setIdEspecialidad("");
        goTo("/citas");
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
        <h1>Crear Cita</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Numero de Cita</label>
        <input
          name="codigo"
          type="text"
          onChange={(e) => setCodigo(e.target.value)}
          value={codigo}
        />
        <label>Descripcion de la Cita</label>
        <input
          name="descripcion"
          type="text"
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
        />
        <label>Id del Usuario:</label>
        <input
          name="id_paciente"
          type="text"
          onChange={(e) => setIdPaciente(e.target.value)}
          value={id_paciente}
        />
        <label>Id de Especialidad:</label>
        <input
          name="id_especialidad"
          type="text"
          onChange={(e) => setIdEspecialidad(e.target.value)}
          value={id_especialidad}
        />
        <button>Crear</button>
      </form>
      </div>
      <div className="dashboard">
        <h1>Citas pendientes</h1>
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
