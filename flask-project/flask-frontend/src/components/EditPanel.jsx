import  {useState,useEffect} from 'react'
import axios from 'axios'
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
const EditPanel=({idData})=> {
    const [datosEditados,setDatosEditados]=useState({})
    const [cargados,setCargados]=useState(true)
    const[modalConsultar,setModalConsultar]=useState(false);

    const closeModal=()=>{
        setModalConsultar(false);
       }
   
    useEffect(()=>{
        setModalConsultar(true)
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:5000/info/${idData}/`)
                setDatosEditados(response.data)
                console.log(response.data)
                setCargados(false);
            }   catch(error){
                console.error(error)
            }
        };
        
        fetchData();
    },[idData])
  

    const handleChange=(e)=>{
        const {name,value}=e.target
        setDatosEditados({ ...datosEditados,[name]:value})
        console.log(name,"cambio a ", value)
    }
    const submit= async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://127.0.0.1:5000/info/${idData}/`,datosEditados)
            window.location.reload();
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
            <h1 className="text-center">Editar Datos</h1>
            </ModalHeader>
            <ModalBody>
            <form onSubmit={submit}>
                <div className="row">
                 
                </div>
                
                <div className="col-12 d-flex justify-content-end mt-2">
                     <button className="btn btn-sm bg-primary" type="submit" >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy text-white" viewBox="0 0 16 16">
  <path d="M11 2H9v3h2z"/>
  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
</svg>
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
export default EditPanel