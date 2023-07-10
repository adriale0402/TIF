const { createApp } = Vue
createApp({
data() {
return {
alumnos:[],
//url:'http://localhost:5000/alumnos',
// si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
//url:'http://promero.pythonanywhere.com/alumnos/', // si ya lo subieron a pythonanywhere
url:'https://adrialerita.pythonanywhere.com/alumnos',
error:false,
cargando:true,
/*atributos para el guardar los valores del formulario */
id:0,
nombre:"",
apellido:"",
dni:"",
carrera:"",
imagen:"",
}
},
methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {
this.alumnos = data;
this.cargando=false
})
.catch(err => {
console.error(err);
this.error=true
})
},
eliminar(alumno) {
const url = this.url+'/' + alumno;
var options = {
method: 'DELETE',
}
fetch(url, options)
.then(res => res.text()) // or res.json()
.then(res => {
location.reload();
})
},
grabar(){
let alumno = {
nombre:this.nombre,
apellido: this.apellido,
dni: this.dni,
carrera:this.carrera,
imagen:this.imagen
}
var options = {
body:JSON.stringify(alumno),
method: 'POST',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)
.then(function () {
alert(" El Alumno se Ha Grabado con Exito!")
window.location.href = "../templates/alumnos.html";
})
.catch(err => {
console.error(err);
alert("Error al Grabar!")
})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')