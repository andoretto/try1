import '../styles/login.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateProvider.jsx'; // Asegúrate de importar correctamente
import axios from 'axios'
function Login() {

  const {dispatch}=useGlobalState();
  const nav = useNavigate();
  
  
  const [credenciales,setCredenciales]=useState({
    documentoCredencial:"",
    contraseniaCredencial:""
  });

  useEffect(() => {
    document.getElementById('error').style.display = 'none';

}, [])
  const handleChange=(e)=>{
    const{name,value}=e.target;
    console.log(`Updating ${name} to ${value}`);
    const updatedValue=String(e.target.value);
    setCredenciales({... credenciales,[name]:updatedValue})
  }
  const submit=(event)=>{
    event.preventDefault()

    if((credenciales.documentoCredencial==='')|(credenciales.contraseniaCredencial==='')){
      const error=document.getElementById('error')
      error.style.display='block'
    }
    const log={
      documento:credenciales.documentoCredencial,
      contrasenia:credenciales.contraseniaCredencial
    }
    const verificacion= async()=>{
      try{
        const response=await axios.post('http://127.0.0.1:5000/login',log)
        if(response.data.message==="OK"){
          dispatch({ type: 'SET_DOCUMENTO', payload: response.data.documento});
          
          if (response.data.Rol===1){
            nav("/admin")
            
          }else{
            nav("/cliente")
          }
        }
        
        
      }catch(error){
        console.error(error)
      }
    }
    verificacion();
  }

  return (
    <div className="login" >
        <div>
        <div >
            <div className="col-12 text-center mt-4" > 
            <h1 className="text-center pt-3 ">Ingreso</h1>
            </div>
        </div>
        <div className="row d-flex align-items-center">
            <div className="col-12">
            <form action="" className="formulario-ingreso" onSubmit={submit}>
              <div className="row text-center">
                <div className="col-6 input-login">
                  <p  className='texto-login'>Usuario</p>
                  <input type="text" className="form-control" name='documentoCredencial' id='documentoCredencial' value={credenciales.documentoCredencial} onChange={handleChange}/>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <p className='texto-login'>Contraseña</p>
                  <input type="password" className="form-control" id='contraseniaCredencial' name='contraseniaCredencial' value={credenciales.contraseniaCredencial} onChange={handleChange}/>
                </div>
              </div>
              <div id="boton-ingreso">
                <p className='text-danger' id='error'>Usuario o Contraseña incorrecto</p>
              <button type='submit' className='btn btn-primary mt-2' >Ingresar</button>
              </div>
            </form>
            </div>
           
        </div>
        </div>
    </div>
  )
}

export default Login