from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hola'
#Configuracion de la conexion a la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:''@localhost/gamecrud'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
cors= CORS(app, origins=['http://localhost:5173'])


class Data(db.Model):

    __tablename__="data"

    IDData=db.Column(db.Integer,primary_key=True)

    Date=db.Column(db.Date,nullable=False)
    IDGame=db.Column(db.Date,nullable=False)
    NombreJuego=db.Column(db.String(100),nullable=False)
    IDUser=db.Column(db.Integer,nullable=False)
    Username=db.Column(db.String(100),nullable=False)
    Gang=db.Column(db.String(100),nullable=False)
    preguntas=db.Column(db.Text,nullable=False)
    Intento=db.Column(db.Integer,nullable=False)


    def get_id(self):

        return str(self.preguntas)





#ruta para consultar cada data
@app.route("/info/<int:IDData>", methods=['GET'])
def mainData(IDData):
    data = Data.query.filter_by(IDData=IDData).first()

    if not data:
        return jsonify({"error": "Cliente no encontrado"}), 404
    
    preguntas_filtro_sol_medio=data.preguntas.replace("\u263c","")
    preguntas_separadas_l =preguntas_filtro_sol_medio.split("¬")
    preguntas_separadas_l.remove(" ")
    
    preguntas_por_grupo=[]
    for i in range(0, len(preguntas_separadas_l),10):
        preguntas_separadas_l[i].replace("☼","")
        sublista=preguntas_separadas_l[i:i+10]
        if len(sublista)>= 9:
            
            sublista[7]=sublista[7].split(">")
            sublista[7].remove("¶")

            sublista[9]=sublista[9].split("<")
            sublista[9].remove("¶")
        preguntas_por_grupo.append(sublista)

    dataLoaded = {
        "IDData": data.IDData,
        "date": data.Date,
        "IDGame": data.IDGame,
        "NombreJuego": data.NombreJuego,
        "IDUser": data.IDUser,
        "Username": data.Username,
        "Gang":data.Gang,
        "preguntas":preguntas_por_grupo,
        "Intento":data.Intento,
    }

    return jsonify(dataLoaded)


          
@app.route("/info", methods=['GET'])
def allData():
    dataCenter = Data.query.all()

    if not dataCenter:
        return jsonify({"error": "No hay registros"}), 404

    lista_datos = []
    for data in dataCenter:
        
        preguntas_separadas_l=data.preguntas.split("¬")
        preguntas_sin_espacios_l = [pregunta.strip() for pregunta in preguntas_separadas_l if pregunta.strip()]

        

        dataComplete = {
            "IDData": data.IDData,
            "date": data.Date,
            "IDGame": data.IDGame,
            "NombreJuego": data.NombreJuego,
            "IDUser": data.IDUser,
            "Username": data.Username,
            "Gang": data.Gang,
            "preguntas":preguntas_sin_espacios_l,
            "intento": data.Intento,
        }
        lista_datos.append(dataComplete)

    return jsonify(lista_datos)
@app.route("/info/<int:IDData>", methods=['PUT'])
def editUsuario(IDData):

    data = Data.query.get(IDData)

    if not data:
        return jsonify({"error": "Data no encontrada"}), 404


    data.IDData = request.json.get('IDData', data.IDData)
    data.Date = request.json.get('Date', data.Date)
    data.IDGame = request.json.get('IDGame', data.IDGame)
    data.NombreJuego = request.json.get('NombreJuego', data.NombreJuego)
    data.IDUser = request.json.get('IDUser', data.IDUser)
    data.Username = request.json.get('Username', data.Username)
    data.Gang=request.json.get('Gang',data.Gang)
    data.preguntas=request.json.get('preguntas',data.preguntas)
    data.Intento=request.json.get('Intento',data.Intento)
    
    db.session.commit()

    return jsonify({"success": " Cambio hecho correctamente"})


if __name__ == "__main__":
    
    
    # Iniciar la aplicación Flask con debug para pruebas
    app.run(debug=True)