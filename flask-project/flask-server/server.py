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
    preguntas_separadas_l = [pregunta for pregunta in preguntas_separadas_l if pregunta.strip()]
    
    preguntas_por_grupo=[]
    for i in range(0, len(preguntas_separadas_l),10):
        preguntas_separadas_l[i].replace("☼","")
        sublista=preguntas_separadas_l[i:i+10]
        if len(sublista)>= 9:
            sublista[7]=sublista[7].split(">")
            sublista[7]=[pregunta for pregunta in sublista[7] if pregunta.strip("¶")]
            if len(sublista[7][-1]) > 0:
                sublista[7][-1]=sublista[7][-1][:-1]
                print ("Esto es lo que busco:", sublista[7][-1][-1])
            sublista[9]=sublista[9].split("<")
            sublista[9]=[pregunta for pregunta in sublista[9] if pregunta.strip("¶")]
            if len(sublista[9]) > 0:
                sublista[9][-1]=sublista[9][-1][:-1]
                print ("Esto es lo que busco:", sublista[9][-1][-1])
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
@app.route("/update/<int:IDData>", methods=['PUT'])
def update_data(IDData):
    data = Data.query.get(IDData)

    if not data:
        return jsonify({"Error": "Data no encontrada"}), 404

    json_data = request.json

    preguntas = json_data.get('preguntas', [])
    
    preguntas_correctas_filter=[]
    preguntas_incorrectas_filter=[]
    arreglosinpreguntas = preguntas[:]
    for grupo in preguntas:
        preguntas_correctas=""
        preguntas_incorrectas=""

        for pregunta in grupo[7]:
            preguntas_incorrectas+=">"+pregunta
         

        if len(preguntas_incorrectas)>0:
            preguntas_incorrectas="¶"+preguntas_incorrectas+"¶"
        else:
            preguntas_incorrectas+="¶"


        for pregunta in grupo[9]:
            preguntas_correctas+="<"
            preguntas_correctas+=pregunta

        if len(preguntas_correctas)>0:
            preguntas_correctas="¶"+preguntas_correctas+"¶"
        else:
            preguntas_correctas+="¶"
        

        preguntas_correctas_filter.append(preguntas_correctas)
        preguntas_incorrectas_filter.append(preguntas_incorrectas)

    for i, grupo in enumerate(arreglosinpreguntas):
        grupo[7]=preguntas_incorrectas_filter[i]
        grupo[9]=preguntas_correctas_filter[i]

       

    texto_final="¬".join(arreglosinpreguntas[0])
    texto_final+="¬ ☼"

    data.IDData = json_data.get('IDData', data.IDData)
    data.Date = json_data.get('Date', data.Date)
    data.IDGame = json_data.get('IDGame', data.IDGame)
    data.NombreJuego = json_data.get('NombreJuego', data.NombreJuego)
    data.IDUser = json_data.get('IDUser', data.IDUser)
    data.Username = json_data.get('Username', data.Username)
    data.Gang = json_data.get('Gang', data.Gang)
    data.Intento = json_data.get('Intento', data.Intento)
    data.preguntas = texto_final
    db.session.commit()

    return jsonify({"Estado": "Exitoso"}),200


if __name__ == "__main__":
    
    
    # Iniciar la aplicación Flask con debug para pruebas
    app.run(debug=True)