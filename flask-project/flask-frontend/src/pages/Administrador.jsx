import "../styles/administrador.css";
import { useState,useEffect } from "react";
import { useGlobalState } from '../context/GlobalStateProvider.jsx';
import axios from "axios"
import {Modal,ModalBody,ModalFooter} from 'reactstrap'
function Admin() {
  const [infoAdmin,SetInfoAdmin]=useState();
  const[infoUsuarios,SetInfoUsuarios]=useState([]);
  const [loading, setLoading] = useState(true);
  const[modalOpen,setModalOpen]=useState(false);
  const[addEmpleado,SetAddEmpleado]=useState({
        documento:'',
        nombre1:'',
        nombre2:'',
        apellido1:'',
        apellido2:'',
        telefono:''
  })
  const { state } = useGlobalState();
  useEffect(() => { 
    const datosUsuarios = async () => {
      try {
        //Consulta para ver todos los usuarios
        const resultado = await axios("http://127.0.0.1:5000/usuarios");
        SetInfoUsuarios(resultado.data);
        console.log(resultado.data)
        
      } catch (error) {
        console.error(error)
      }
    }
    //consulta de info de admin 
    const datosAdmin= async()=>{
      const documentoCliente=state.documento;
      try  {
        const infoAdmin=await axios.get('http://127.0.0.1:5000/cliente/'+documentoCliente)
      SetInfoAdmin(infoAdmin.data)
      setLoading(false)
      }catch(error){
        console.error(error)
        setLoading(false)
      }
}
  datosAdmin();
  datosUsuarios();
},[state.documentoCliente]);

if (loading) {
  return <p>Cargando...</p>;
}
const handleChange=(e)=>{
  const{name,value}=e.target;
  SetAddEmpleado({... addEmpleado,[name]:value})
  console.log(name+ " cambio a "+ value)
}
const closeModalAdd=()=>{
  setModalOpen(false);
  SetAddEmpleado({
    documento: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    telefono: ''
  });
 }
 const openModalAdd=()=>{
  setModalOpen(true);
 }

const submitEmpleado=(event)=>{
  event.preventDefault()
  const empleado={
    documento:addEmpleado.documento,
    nombre1:addEmpleado.nombre1,
    nombre2:addEmpleado.nombre2,
    apellido1:addEmpleado.apellido1,
    apellido2:addEmpleado.apellido2,
    telefono:addEmpleado.telefono
  }
  const enviarDatosEmpleado=async()=>{
    try{
      const response= await axios.post('http://127.0.0.1:5000/registrar-empleado',empleado)
    if(response){
      console.log("Empleado creado con exito")
      SetAddEmpleado({
        documento: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        telefono: ''
      });
    }
    }catch(error){
      console.error(error)
    }
  }
  enviarDatosEmpleado();
  
}
  return (
    <div>
      <div>
        <a href="/" className="btn btn-primary mt-3" id="boton-salir">
          Salir
        </a>
      </div>
      <div id="panel-administrador">
        <div>
          <div className="row mb-3 pb-2 mt-4">
            <div className="col-12">
              <h1 className="text-center pt-2"> Bienvenid@ {infoAdmin.nombre1}
              </h1>
            </div>
          </div>
          <div className="row">
            <h2 className="text-center mb-0" id="texto-administracion">Administrar usuarios</h2>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              
              <div className="table-responsive col-10 mx-auto ">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Documento</th>
                      <th>Tipo de documento</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      infoUsuarios && infoUsuarios.map((user, i) => {
                        return (
                          <tr key={i}>
                            <td>{user.nombre1 + (user.nombre2 ? ` ${user.nombre2}` : '')+" "+user.apellido1 + (user.apellido2 ? ` ${user.apellido2}` : '')}
                            </td>
                            <td>{user.documento}</td>
                            <td>{user.tipo_de_documento===1? "C.C":"T.I"}</td>
                            <td>{user.rol===1? "Administrador": "Cliente"}</td>
                          </tr>
                        )
                      })
                    } 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-11  d-flex  align-items-end justify-content-end">
              <button className="btn btn-dark mb-2" onClick={()=>openModalAdd()} >+ empleado</button>
            </div>
          </div>
        </div>
      </div>
                    
      <Modal isOpen={modalOpen}>
      
      <ModalBody>
        <form onSubmit={submitEmpleado} id="form_empleado">
        <div className="row">
          <div className="col-6">
            <label htmlFor="">Primer nombre:</label>
            <input type="text" className="form-control" id="nombre1" name="nombre1"  onChange={handleChange} value={addEmpleado.nombre1} required/>
          </div>
          <div className="col-6">
            <label htmlFor="">Segundo nombre:</label>
            <input type="text" className="form-control" id="nombre2" name="nombre2" onChange={handleChange} value={addEmpleado.nombre2}  />
          </div>
        </div>
        <div className="row  mt-2">
          <div className="col-6">
            <label htmlFor="">Primer apellido:</label>
            <input type="text" className="form-control" id="apellido1" name="apellido1" required onChange={handleChange} value={addEmpleado.apellido1}  />
          </div>
          <div className="col-6">
            <label htmlFor="">Segundo apellido:</label>
            <input type="text" className="form-control" id="apellido2" name="apellido2" onChange={handleChange} value={addEmpleado.apellido2} />
          </div>
          <div className="col-6">
            <label htmlFor="">Telefono:</label>
            <input type="number" className="form-control" id="telefono" name="telefono" required onChange={handleChange} value={addEmpleado.telefono}/>
          </div>
          <div className="col-6">
            <label htmlFor="">Documento:</label>
            <input type="number" className="form-control" id="documento" name="documento" required onChange={handleChange} value={addEmpleado.documento}/>
          </div>
          
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end mt-2">
          <button className="btn btn-sm bg-info" type="submit" >
          <i className="bi bi-person-plus-fill"></i>
          </button>
          </div>
        </div>
        </form>    

      </ModalBody>
      <ModalFooter>
          <button className="btn btn-sm bg-danger"  onClick={() =>closeModalAdd()}>
            <i className="bi bi-x-lg"></i>
          </button>
          
        </ModalFooter>
      </Modal> 
    </div>
  )
}

export default Admin