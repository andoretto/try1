import "../styles/cliente.css";
import { useGlobalState } from '../context/GlobalStateProvider.jsx';
import axios from 'axios'
import { useState,useEffect } from "react";

function Cliente() {
  const [infoCliente,SetInfoCliente]=useState();
  const { state } = useGlobalState();
  const [loading, setLoading] = useState(true);
  useEffect(() => { 
    const datosCliente= async()=>{
      const documento=state.documento;
      try  {
        const infoCliente=await axios.get('http://127.0.0.1:5000/cliente/'+documento)
      SetInfoCliente(infoCliente.data)
      setLoading(false)
      console.log(infoCliente.data.nombre1)
      }catch(error){
        console.error(error)
        setLoading(false)
      }
}
  datosCliente();
},[state.documentoCliente]);
if (loading) {
  return <p>Cargando...</p>;
}
  return (
    <div>
      <div>
        <a href="/" className="btn btn-primary mt-3" id="boton-salir">
          Salir
        </a>
      </div>
      <div className="panel-cliente">
        <div>
          <div className="row mb-3 pb-2 mt-4">
            <div className="col-12">
              <h1 className="text-center pt-2">
                Bienvenido {infoCliente.nombre1 +" "+ (infoCliente.nombre2? infoCliente.nombre2: " ")}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <h2>Citas agendadas</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Empleado</th>
                    <th scope="col">Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <button className="btn btn-primary mb-2">Agenda tu cita</button>
            </div>
            <div className="col-6 text-center">
              <button className="btn btn-primary mb-2">Editar perfil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cliente;
