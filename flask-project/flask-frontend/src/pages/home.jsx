import {useState,useEffect} from 'react';
import "../styles/home.css";
import EditPanel from '../components/EditPanel';
import axios from 'axios'
import {Modal, ModalBody} from 'reactstrap';

const Home = () => {
  const [data,setData]=useState();
  const [dataEdit, setDataEdit]=useState(false)
  const[modalConsultar,setModalConsultar]=useState(false);
  const [selectedIDData, setSelectedIDData] = useState(null);
  const [modalData, setModalData] = useState([]);
  const[preguntas,setPreguntas]=useState([])
  useEffect(()=> {
    getData();
  },[])

  const getData= async ()=> {
    try{
    const response=await axios.get("http://127.0.0.1:5000/info")
    setData(response.data)
    }catch(error){
      console.log(error)
    }
  }

  const modalView=async(idData)=>{
    setModalConsultar(true);
    setSelectedIDData(idData)
    const data =await axios.get(`http://127.0.0.1:5000/info/${idData}`);
    
    setModalData(data.data.preguntas);
    setPreguntas(data.data.preguntas);

    console.log("esto es modalData",data.data.preguntas)
    
  }

  const closeModal=()=>{
    setModalConsultar(false);
    setModalData([]);
    setPreguntas([]);
   }
  const cancelEdit=()=>{
    setDataEdit(false)
    const cancelButton= document.querySelector(".cancel-edit")
    const saveButton= document.querySelector(".save-edit")
    const editButton= document.querySelector(".edit-edit")
    cancelButton.style.display="none"
    saveButton.style.display="none"
    editButton.style.display="block"
   }
   
  const modalEdit= ()=>{
    setDataEdit(true)
    const cancelButton= document.querySelector(".cancel-edit")
    const editButton= document.querySelector(".edit-edit")
    const saveButton= document.querySelector(".save-edit")
    editButton.style.display="none"
    cancelButton.style.display="block"
    saveButton.style.display="block"
    console.log("Si")
    
  }
  const sendDataEdit= async ()=>{
    
    try{
      const response = await axios.put(`http://127.0.0.1:5000/update/${selectedIDData}`,{
        preguntas: preguntas,

      })
      console.log("Datos editados enviados:", response.data);
    } catch (error){
      console.error(error)
    }
  }

  const handleChange = (e,dataIndex,itemIndex,itemIndex2) => {
    const newData = [...preguntas];
    console.log(e.target.value)
    newData[dataIndex][itemIndex][itemIndex2] = e.target.value;
    setPreguntas(newData);
  };


  return (
    <div className="home" >
        <div className='Row'>
          <div id="table">
            <table className="table table-striped table-hover">
              <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>IDGame</th>
                    <th scope='col'>Intento</th>
                    <th scope='col'>Nombre del juego</th>
                    <th scope='col'>Usuario</th>
                    <th scope='col actions'>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                {data && data.map((data) => {
                  return (
                    <tr key={data.IDData}>
                      <td>{data.IDData}</td>
                      <td>{data.date}</td>
                      <td>{data.IDGame}</td>
                      <td>{data.intento}</td>
                      <td>{data.NombreJuego}</td>
                      <td>{data.Username}</td>
                      <td>
                        <div id='options'>
                       
                        <button className="btn  btn-sm view" id="icon" onClick={()=>modalView(data.IDData)}>
                        <i className="bi bi-eye-fill"></i></button>
                        </div>
                      </td>
                    </tr>
                      );
                })}
              </tbody>
            </table>
          </div>
    </div>
    <Modal isOpen={modalConsultar} toggle={() => {closeModal(); cancelEdit();}} className="modal-lg" modalClassName="modal-dialog-centered">
      {modalData.length>0? <ModalBody>
       
       <div >
        <div className=' d-flex justify-content-between'>
        <div className="m-2 cancel-edit">
            <button onClick={()=>cancelEdit()} className="btn btn-sm btn-danger" id="icon-edit">
            <i className="bi bi-x"></i></button>
          </div>
          <div className="flex-grow-1"></div>
          <div className="m-2 save-edit">
            <button className="btn btn-sm save"  onClick={()=>sendDataEdit()}>
            <i className="bi bi-cloud-check-fill clouda"></i></button>
          </div>
          <div className="m-2 edit-edit">
            <button onClick={()=>modalEdit()} className="btn btn-sm edit" id="icon-edit">
            <i className="bi bi-pencil-fill"></i></button>
          </div>
         
         
        </div>


         {modalData.map && modalData.map((data, index) => (
          <div className="col-12" key={data.id}>
            <div className="row">
              {Array.isArray(data) && data.map((item, itemIndex) => (
                itemIndex !== 7 && itemIndex !== 6 && itemIndex !== 9 && itemIndex !== 8 ? (
                  <div className="col-6" key={item}>
                    {itemIndex === 0 ? (<p>Fecha: {item}</p>) : (<p>{item[0].toUpperCase() + item.slice(1)}</p>)}
                  </div>
                ) : null
              ))}
            </div>
            <div >
              <div className='row'> 
                <div className='col-6'>
                <h3 className='text-center'>Incorrectas</h3>
                  <div className="qst-container">
                    {Array.isArray(data) && data.map((item, itemIndex) => (
                      itemIndex === 7 ? (
                        <div  key={itemIndex}>
                          {Array.isArray(item) && item.map((item2, itemIndex2) => (
                            <>
                            {dataEdit?  (<textarea key={itemIndex2} type='text' className='form-control' onChange={(e) => handleChange(e, index, itemIndex, itemIndex2)}  value={item2}/> ):
                            ( <p key={itemIndex2} className='text-start qst' >{item2}</p>)}
                         
                            <hr/>
                            </>
                            
                          ))}
                          
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
                <div className="col-6">
                <h3 className='text-center'>Correctas</h3>
                <div className="qstr-container"> 
                {Array.isArray(data) && data.map((item, itemIndex) => (
                  
                    itemIndex ===  9? (
                      <div  key={itemIndex}>
                        
                        {Array.isArray(item) && item.map((item2, itemIndex2) => (
                          <> {dataEdit?  (<input key={itemIndex2} type='text' className='form-control' onChange={(e) => handleChange(e, index, itemIndex, itemIndex2)}  value={item2}/> ):
                            ( <p key={itemIndex2} className='text-start qst' >{item2}</p>)}
                         
                          <hr/>
                          </>
                        ))}
                      </div>
                    ) : null
                  ))}
                  </div>
                    
                </div>
                <hr />
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </ModalBody> :
      <ModalBody>
        <div className=' justify-content-between d-flex '  >
        
          <div className='d-flex justify-content-center align-items-center m-2'>
          
            <h3>No se presentan intentos asociados</h3>
            
          </div>
          <button className='btn btn-danger m-2' onClick={()=>closeModal()}> <i className="bi bi-x"></i></button>
        </div>
      </ModalBody>}
      
    </Modal>

       
    </div>
  );
};
export default Home;
