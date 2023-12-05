import  {useState,useEffect} from 'react'
import axios from 'axios'
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
const ComponenteEdicion=({documento})=> {
    const [datosEditados,setDatosEditados]=useState({})
    const [cargados,setCargados]=useState(true)
    const[modalConsultar,setModalConsultar]=useState(false);

    const closeModal=()=>{
        setModalConsultar(false);
       }
    const openModal=()=>{
        setModalConsultar(true)
    }
    useEffect(()=>{
        setModalConsultar(true)
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:5000/cliente/${documento}`)
                setDatosEditados(response.data)
                console.log(response.data)
                setCargados(false);
            }   catch(error){
                console.error(error)
            }
        };

        fetchData();
    },[documento])
    const handleChange=(e)=>{
        const {name,value}=e.target
        setDatosEditados({ ...datosEditados,[name]:value})
        console.log(name,"cambio a ", value)
    }
    const submit= async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://127.0.0.1:5000/editar-usuario/${documento}`,datosEditados)
            console.log('Datos editados con exito')
        }catch(error){
            console.error(error)
        }
    }
    if (cargados){
        return <p>Cargando..</p>
    }
    return(
        <Modal isOpen={modalConsultar}>
            <ModalHeader>
            <h1 className="text-center">Editar perfil</h1>
            </ModalHeader>
            <ModalBody>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-6 ">
                        <label>Primer Nombre:</label>
                    <input type="text" name="nombre1" className="form-control" value={datosEditados.nombre1} onChange={handleChange} disabled/>
                    </div>
                    <div className="col-6">
                    <label>Segundo Nombre:</label>
                    <input type="text" name="nombre2" className="form-control"value={datosEditados.nombre2} onChange={handleChange} />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                    <label>Primer apellido:</label>
                        <input type="text"  className="form-control " name="apellido1" value={datosEditados.apellido1} onChange={handleChange} disabled />
                    </div>
                    <div className="col-6">
                    <label>Segundo apellido:</label>
                        <input type="text"  className="form-control " name="apellido2" value={datosEditados.apellido2? datosEditados.apellido2:''} onChange={handleChange}/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-5">
                    <label>Documento:</label>
                        <input type="text"  className="form-control " name="documento" value={datosEditados.documento} onChange={handleChange} disabled />
                    </div>
                    <div className="col-2">
                        <label></label>
                        <input type="text" className='form-control' name="tipo_documento" value={datosEditados.tipoDoc===1? 'C.C':'T.I'} disabled />
                    </div>
                    <div className="col-4">
                    <label>Telefono:</label>
                        <input type="text"  className="form-control " name="nombre2" value={datosEditados.telefono} onChange={handleChange}/>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-end mt-2">
                     <button className="btn btn-sm bg-success" type="submit" >
                        <i className="bi bi-pen"></i>
                    </button>
                 </div>
                </form>
           
            </ModalBody>
            <ModalFooter>
            
            <button className="btn btn-sm bg-danger"  onClick={() =>closeModal()}>
            <i className="bi bi-x-lg"></i>
          </button>

            </ModalFooter>
        </Modal>
        )
}
export default ComponenteEdicion