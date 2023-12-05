import "../styles/home.css";
const Home = () => {
  return (
    <div className="home" >
        <div>
        <div>
            <div className="col-12 text-center mt-4" > 
            <h1 className="text-center pt-3 ">Salon de belleza</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-12 botones">
            <a href="/registro" className="btn btn-primary">Registrarse</a>
            <a href="/login" className="btn btn-primary">Ingresar</a>
            </div>
            <div className="col-6 text-center">
            </div>
        </div>
        </div>
    </div>
  );
};
export default Home;
