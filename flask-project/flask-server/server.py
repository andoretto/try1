from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hola'
#Configuracion de la conexion a la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:''@localhost/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
cors= CORS(app, origins=['http://localhost:5173'])
login_manager = LoginManager(app)


#Declaracion de modelos 
class Rol(db.Model):
    __tablename__="roles"
    idrol=db.Column(db.Integer,primary_key=True,autoincrement=True)
    rol=db.Column(db.String(45),nullable=False)

class Documento(db.Model):
    __tablename__="documentos"
    idDoc=db.Column(db.Integer,primary_key=True,autoincrement=True)
    doc=db.Column(db.String(10))

class Usuario(db.Model,UserMixin):

    __tablename__="usuarios"

    documento=db.Column(db.Integer,primary_key=True)
    nombre1=db.Column(db.String(45),nullable=False)
    nombre2=db.Column(db.String(45),nullable=True)
    apellido1=db.Column(db.String(45))
    apellido2=db.Column(db.String(45),nullable=True)
    telefono=db.Column(db.Integer,nullable=False)
    contrasenia=db.Column(db.String(64),nullable=False)
    documentos_idDoc=db.Column(db.Integer, db.ForeignKey('documentos.idDoc'),nullable=False)
    roles_idrol=db.Column(db.Integer, db.ForeignKey('roles.idrol'),nullable=False)

    rol=db.relationship('Rol',backref=db.backref('usuarios'),lazy=True)
    documento_tipo=db.relationship('Documento',backref=db.backref('usuarios'),lazy=True)

    def get_id(self):

        return str(self.documento)

class Empleado(db.Model):
    __tablename__="empleados"
    documento=db.Column(db.Integer,primary_key=True)
    nombre1=db.Column(db.String(45),nullable=False)
    nombre2=db.Column(db.String(45),nullable=True)
    apellido1=db.Column(db.String(45))
    apellido2=db.Column(db.String(45),nullable=True)
    telefono=db.Column(db.Integer,nullable=False)

class Citas(db.Model):
    __tablename__="citas"
    idcita = db.Column(db.Integer, primary_key=True, autoincrement=True)
    empleados_documento=db.Column(db.Integer,db.ForeignKey('empleados.documento'),nullable=False)
    usuarios_documento=db.Column(db.Integer,db.ForeignKey('usuarios.documento'),nullable=False)
    fecha=db.Column(db.Date, nullable=False)
    hora=db.Column(db.Time, nullable=False)
    motivo=db.Column(db.String(45),nullable=True)
    empleado=db.relationship('Empleado',backref=db.backref('citas_empleado'),foreign_keys=[empleados_documento])
    usuario = db.relationship('Usuario', backref=db.backref('citas_usuario'), foreign_keys=[usuarios_documento])

##Rutas de usuarios

#ruta para añadir usuarios
@app.route("/registrar-user",methods=['POST'])
def adduser():
    documento=request.json['documento']
    nombre1=request.json['nombre1']
    nombre2=request.json.get('nombre2',None)
    apellido1=request.json['apellido1']
    apellido2=request.json.get('apellido2',None)
    telefono=request.json['telefono']
    contrasenia=bcrypt.generate_password_hash(request.json['contrasenia']).decode('utf-8')
    documentos_idDoc=request.json['documentos_idDoc']
    roles_idrol=request.json['roles_idrol']

    nuevo_usuario=Usuario(
        documento=documento,
        nombre1=nombre1,
        nombre2=nombre2,
        apellido1=apellido1,
        apellido2=apellido2,
        telefono=telefono,
        contrasenia=contrasenia,
        documentos_idDoc=documentos_idDoc,
        roles_idrol=roles_idrol
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"success":"Usuario registrado correctamente"})

#ruta para consultar cada usuario
@app.route("/cliente/<int:documento>", methods=['GET'])
def cliente(documento):
    cliente = Usuario.query.filter_by(documento=documento).first()

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    perfil_cliente_data = {
        "documento": cliente.documento,
        "nombre1": cliente.nombre1,
        "nombre2": cliente.nombre2,
        "apellido1": cliente.apellido1,
        "apellido2": cliente.apellido2,
        "telefono": cliente.telefono,
        "rol":cliente.roles_idrol,
        "tipoDoc":cliente.documentos_idDoc
    }

    return jsonify(perfil_cliente_data)

#ruta para eliminar usuario
@app.route("/eliminar-usuario/<int:documento>", methods=['DELETE'])
def deleteuser(documento):
    usuario = Usuario.query.get(documento)

    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    db.session.delete(usuario)
    db.session.commit()

    return jsonify({"success": "Usuario eliminado correctamente"})

#ruta para consultar todos los usuarios
@app.route("/usuarios", methods=['GET'])
def todos_los_usuarios():
    usuarios = Usuario.query.all()

    if not usuarios:
        return jsonify({"error": "No hay usuarios registrados"}), 404

    lista_usuarios = []
    for usuario in usuarios:
        perfil_usuario = {
            "documento": usuario.documento,
            "nombre1": usuario.nombre1,
            "nombre2": usuario.nombre2,
            "apellido1": usuario.apellido1,
            "apellido2": usuario.apellido2,
            "telefono": usuario.telefono,
            "contraseña":usuario.contrasenia,
            "tipo_de_documento":usuario.documentos_idDoc,
            "rol":usuario.roles_idrol
        }
        lista_usuarios.append(perfil_usuario)

    return jsonify(lista_usuarios)
#ruta para editar un usuario
@app.route("/editar-usuario/<int:documento>", methods=['PUT'])
def editUsuario(documento):

    usuario = Usuario.query.get(documento)

    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    usuario.documento = request.json.get('documento', usuario.documento)
    usuario.nombre1 = request.json.get('nombre1', usuario.nombre1)
    usuario.nombre2 = request.json.get('nombre2', usuario.nombre2)
    usuario.apellido1 = request.json.get('apellido1', usuario.apellido1)
    usuario.apellido2 = request.json.get('apellido2', usuario.apellido2)
    usuario.telefono = request.json.get('telefono', usuario.telefono)

    nueva_contrasenia=request.json.get('nueva_contrasenia')
    if nueva_contrasenia:
        usuario.contrasenia=bcrypt.generate_password_hash(nueva_contrasenia).decode('utf-8')

    db.session.commit()

    return jsonify({"success": "Usuario actualizado correctamente"})

##Rutas para Empleados
@app.route("/empleados",methods=['GET'])
def todos_los_empleados():
    empleados = Empleado.query.all()

    if not empleados:
        return jsonify({"error": "No hay empleados registrados"}), 404

    lista_empleados = []
    for empleado in empleados:
        perfil_empleado = {
            "documento": empleado.documento,
            "nombre1": empleado.nombre1,
            "nombre2": empleado.nombre2,
            "apellido1": empleado.apellido1,
            "apellido2": empleado.apellido2,
            "telefono": empleado.telefono,
        }
        lista_empleados.append(perfil_empleado)

    return jsonify(lista_empleados)

#ruta para añadir Empleados
@app.route('/registrar-empleado',methods=['POST'])
def addEmpleado():
    documento=request.json['documento']
    nombre1=request.json['nombre1']
    nombre2=request.json.get('nombre2',None)
    apellido1=request.json['apellido1']
    apellido2=request.json.get('apellido2',None)
    telefono=request.json['telefono']

    nuevo_empleado=Empleado(
        documento=documento,
        nombre1=nombre1,
        nombre2=nombre2,
        apellido1=apellido1,
        apellido2=apellido2,
        telefono=telefono
    )
    db.session.add(nuevo_empleado)
    db.session.commit()

    return jsonify({"success":"Empleado registrado correctamente"})

#ruta para editar Empleados
@app.route("/editar-empleado/<int:documento>", methods=['PUT'])
def editEmpleado(documento):
    
    empleado = Empleado.query.get(documento)

    if not Empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    empleado.documento = request.json.get('documento', empleado.documento)
    empleado.nombre1 = request.json.get('nombre1', empleado.nombre1)
    empleado.nombre2 = request.json.get('nombre2', empleado.nombre2)
    empleado.apellido1 = request.json.get('apellido1', empleado.apellido1)
    empleado.apellido2 = request.json.get('apellido2', empleado.apellido2)
    empleado.telefono = request.json.get('telefono', empleado.telefono)
    db.session.commit()
    return jsonify({"success": "Empleado actualizado correctamente"})

#ruta para eliminar empleados
@app.route("/eliminar-empleado/<int:documento>", methods=['DELETE'])
def deleteEmpleado(documento):
    empleado = Empleado.query.get(documento)

    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    db.session.delete(empleado)
    db.session.commit()
    return jsonify({"success": "Empleado eliminado correctamente"})


#manager de login
@login_manager.user_loader
def load_user(user_id):
    return Usuario.query.get(int(user_id))  

#agregar una cita ruta
@app.route('/agregar-cita',methods=['POST'])
def method_name():
    empleados_documento=request.json['empleados_documento']
    usuarios_documento=request.json['usuarios_documento']
    fecha_str=request.json['fecha']
    hora_str=request.json['hora']
    motivo=request.json.get('motivo',None)


    

    nueva_cita=Citas(
        empleados_documento=empleados_documento,
        usuarios_documento=usuarios_documento,
        fecha=fecha_str,
        hora=hora_str,
        motivo=motivo
    )
    db.session.add(nueva_cita)
    db.session.commit()

    return jsonify({"success":"Cita agregada exitosamente"})

#ruta para consultar citas de acuerdo al documento del usuario
@app.route("/cliente/citas/<int:documento>", methods=['GET'])
def citasCliente(documento):
    # Utilizando join para obtener información de la cita y los clientes
    citas = db.session.query(Citas, Usuario).join(
        Usuario, Citas.usuarios_documento == Usuario.documento
    ).filter(Usuario.documento == documento).all()

    if not citas:
        return jsonify({"error": "Cita no encontrada"}), 404

    arregloCitas = []
    for cita, usuario in citas:
        fecha_formateada = cita.fecha.strftime("%Y-%m-%d")
        hora_formateada = cita.hora.strftime("%H:%M:%S")

        data_citas = {
            "idcita": cita.idcita,
            "documento_cliente": usuario.documento,
            "documento_empleado": cita.empleados_documento,
            "fecha": fecha_formateada,
            "hora": hora_formateada,
            "motivo": cita.motivo,
        }
        arregloCitas.append(data_citas)

    return jsonify(arregloCitas)

#login
@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    print("Data received:", data)
    user=Usuario.query.filter_by(documento=data['documento']).first()

    if user and bcrypt.check_password_hash(user.contrasenia, data['contrasenia']):
        login_user(user)
        return jsonify({"message":"OK","documento":user.documento,"Rol":user.roles_idrol})
    else:
        return jsonify({"message":"Invalid credentials"}),401
    



@app.route('/user',methods=['GET'])
@login_required
def user():
    return jsonify({"documento":current_user.documento,"telefono":current_user.telefono})
#Inicializacion de la aplicacion 
if __name__ == "__main__":
    
    
    # Iniciar la aplicación Flask con debug para pruebas
    app.run(debug=True)