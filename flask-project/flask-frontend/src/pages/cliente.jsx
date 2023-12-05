import "../styles/cliente.css";
import { useGlobalState } from '../context/GlobalStateProvider.jsx';
import axios from 'axios'
import { useState,useEffect } from "react";
import ComponenteEdicion from "../components/editar.jsx";
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

function Cliente() {
  const [infoCliente,SetInfoCliente]=useState();
  const { state } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const [documentoAEditar, setDocumentoAEditar]=useState(null)
  const [empleado, setEmpleado] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cita,SetCita]=useState({
    empleados_documento:'',
    usuarios_documento:'',
    fecha:'',
    hora:'',
    motivo:'',
  })

  const handleChange=(e)=>{
    const{name,value}=e.target;
    SetCita({... cita,[name]:value})
    console.log('name changed',name," value: ",value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if ((cita.fecha==='')|(cita.hora==='')|(cita.empleados_documento==='')){
      console.error("Hay campos vacios")
      return
    }
    const citaAgendada={
      empleados_documento:cita.empleados_documento,
      usuarios_documento:cita.usuarios_documento,
      fecha:cita.fecha,
      hora:cita.hora,
      motivo:cita.motivo
    }
    const enviarDatosCita= async()=>{
      try{
      const response = await axios.post('http://127.0.0.1:5000/agregar-cita',citaAgendada)
      if(response){
        console.log("cita creada con exito")
        SetCita({
          empleados_documento:'',
          usuarios_documento:'',
          fecha:'',
          hora:'',
          motivo:'',
        });
      }
      }catch(error){
        console.error(error)
      }
    }
    enviarDatosCita();
  }
  const openModal=()=>{
    setModalOpen(true)
  }
  const closeModal=()=>{
    setModalOpen(false)
  }
  useEffect(() => { 
    const fetchData = async ()=>{
      try {
        const resultadoTrabajador=await axios("http://127.0.0.1:5000/empleados");
        setEmpleado(resultadoTrabajador.data);
        console.log(resultadoTrabajador.data)
        
      }catch(error){console.error(error)
      setLoading(false)}
    }
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
  fetchData();
  datosCliente();
},[state.documentoCliente]);
if (loading) {
  return <p>Cargando...</p>;
}
const abrirModalEdicion= (documento)=>{
  setDocumentoAEditar(documento);
}
const cerrarModalEdicion =()=>{
  setDocumentoAEditar(null);
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
              <button className="btn btn-primary mb-2" onClick={openModal}>Agenda tu cita</button>
            </div>
            <div className="col-6 text-center">
              <button className="btn btn-primary mb-2" onClick={()=>abrirModalEdicion(infoCliente.documento)}>Editar perfil</button>
            </div>
          </div>
        </div>
      </div>
      {documentoAEditar && (<ComponenteEdicion documento={documentoAEditar} closeModal={cerrarModalEdicion}/>)}
      <Modal isOpen={modalOpen}>
        <ModalHeader>
          <h1>Agenda tu cita</h1>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} id="citaForm">
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="empleadoelect">Seleccionar trabajador:</label>
                <select
                  className="form-control text-center"
                  onChange={handleChange}
                  value={cita.empleados_documento}
                  required
                  name="empleados_documento"
                >
                  <option value="" disabled className="text-center">
                    Seleccione un trabajador
                  </option>
                  {empleado.map((worker) => (
                    <option key={worker.documento} value={worker.documento}>
                      {worker.nombre1+" "+worker.nombre2}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label >Seleccionar fecha:</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={handleChange}
                  value={cita.fecha}
                  required
                />
              </div>
              <div className="col-6">
                <label >Seleccionar hora:</label>
                <input
                  type="time"
                  className="form-control"
                  name='hora'
                  onChange={handleChange}
                  value={cita.hora}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex justify-content-end mt-2">
                <button className="btn btn-sm bg-info" type="submit">
                  Agendar Cita
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-sm bg-danger" onClick={closeModal}>
            <i className="bi bi-x-lg"></i> Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Cliente;
