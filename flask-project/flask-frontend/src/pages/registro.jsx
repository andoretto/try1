import {useState} from 'react';
import axios from 'axios'
import '../styles/registro.css'
function registro () {
  const [datosUsuario,setDatosUsuario] = useState({
    documento:"",
    nombre1:"",
    nombre2:"",
    apellido1:"",
    apellido2:"",
    telefono:"",
    contrasenia:"",
    documentos_idDoc:"",
    roles_idrol:2,
    confirmContrasenia:""
  });
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setDatosUsuario({... datosUsuario,[name]:value})
  }
  const submit=(event)=>{
    event.preventDefault()
    if (datosUsuario.contrasenia!==datosUsuario.confirmContrasenia){
      console.error("Los campos de contraseña no concuerdan")
      return
    }
    const datos={
      documento:datosUsuario.documento,
      nombre1:datosUsuario.nombre1,
      nombre2:datosUsuario.nombre2,
      apellido1:datosUsuario.apellido1,
      apellido2:datosUsuario.apellido2,
      telefono:datosUsuario.telefono,
      contrasenia:datosUsuario.contrasenia,
      documentos_idDoc:datosUsuario.documentos_idDoc,
      roles_idrol:datosUsuario.roles_idrol
    }
    const enviarDatos= async()=>{
      try{
      const response = await axios.post('http://127.0.0.1:5000/registrar-user',datos)
      if(response){

        console.log("usuario registrado con exito")
        document.getElementById("form").reset();
      }
      }catch(error){
        console.error(error)
      }
    }
    enviarDatos();
  }

  return (
    <div className="registro" >
        <div>
        <div >
            <div className="col-12 text-center mt-4" > 
            <h1 className="text-center pt-3 ">Registrate aqui</h1>
            </div>
        </div>
        <div className="row d-flex align-items-center">
            <div className="col-12  ">
            <form action="" className="formulario text-center"  id='form' onSubmit={submit}>
              <div className="row text-center">
                <div className="col-6">
                  <p  className='texto-login'>Primer nombre</p>
                  <input type="text" className="form-control text-center"  required placeholder="Primer nombre" id='nombre1' name='nombre1' value={datosUsuario.nombre1} onChange={handleChange}/>
                </div>
                <div className="col-6">
                  <p  className='texto-login'>Segundo nombre</p>
                  <input type="text" className="form-control text-center" placeholder="Segundo nombre"  id='nombre2' name='nombre2' value={datosUsuario.nombre2} onChange={handleChange}/>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <p  className='texto-login'>Primer apellido</p>
                  <input type="text" className="form-control text-center" placeholder="Primer apellido" required  id='apellido1' name='apellido1' value={datosUsuario.apellido1} onChange={handleChange} />
                </div>
                <div className="col-6">
                  <p  className='texto-login'>Segundo apellido</p>
                  <input type="text" className="form-control text-center" placeholder="Segundo apellido" id='apellido2' name='apellido2' value={datosUsuario.apellido2} onChange={handleChange} />
                </div>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <p  className='texto-login'>Identificación</p>
                  <input type="number" className="form-control text-center" required placeholder="Numero de identificacion" id='documento' name='documento' value={datosUsuario.documento}  onChange={handleChange}/>
                </div>
                <div className="col-6">
                  <p  className='texto-login'>Numero de contacto</p>
                  <input type="number" className="form-control text-center" placeholder="Telefono de contacto" required id='telefono' name='telefono' value={datosUsuario.telefono} onChange={handleChange}/>
                </div>
              </div>
              <div className="row text-center">
              <div className="col-4">
                  <p className='texto-login'>Tipo de documento</p>
                  <select className="form-select text-center" required id='documentos_idDoc' name="documentos_idDoc" value={datosUsuario.documentos_idDoc} onChange={handleChange} >
                    <option value="" disabled></option>
                    <option value="1">C.C</option>
                    <option value="2">T.I</option>
                  </select>
                </div>
                <div className="col-4">
                  <p className='texto-login'>Contraseña</p>
                  <input type="password" className="form-control" name='contrasenia' id='contrasenia' required value={datosUsuario.contrasenia} onChange={handleChange} />
                </div>
                <div className="col-4">
                  <p className='texto-login'>Confirmar contraseña</p>
                  <input type="password" className="form-control" name='confirmContrasenia' id='confirmContrasenia' value={datosUsuario.confirmContrasenia} onChange={handleChange} required/>
                </div>
              </div>
              <div>
              <button  type='submit' className='btn btn-primary mt-4' >Registrarse</button>
              </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default registro