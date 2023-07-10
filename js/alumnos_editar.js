console.log(location.search) // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
data() {
return {
id:0,
nombre:"",
apellido:"",
dni:"",
carrera:"",
imagen:"",
url:'https://adrialerita.pythonanywhere.com/alumnos/'+id,
//url:'http://localhost:5000/alumnos'
}
},
methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {

console.log(data)
this.id=data.id
this.nombre = data.nombre;
this.apellido  =data.apellido
this.dni=data.dni
this.carrera=data.carrera
this.imagen=data.imagen
})
.catch(err => {
console.error(err);
this.error=true
})
},
modificar() {
let alumno = {
nombre:this.nombre,
apellido: this.apellido,
dni: this.dni,
carrera: this.carrera,
imagen:this.imagen
}
var options = {
body: JSON.stringify(alumno),
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)
.then(function () {
alert("El Registro  del Alumno se Ha modificado con Exito!")
window.location.href = "../templates/alumnos.html";
})
.catch(err => {

alert("Se Ha producido un Error al  intentar Modificar")
})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')