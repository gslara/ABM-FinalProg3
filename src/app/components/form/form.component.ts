import { PersonaService } from './../../services/persona.service';
import { Persona } from './../../models/persona';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  persona: Persona = {
    id: null,
    nombre: null,
    apellido: null,
    dni: null
  }

  constructor(private service: PersonaService, private rutaActiva: ActivatedRoute, private router: Router) { }
  
  //Método que se ejecuta cuando se inicia el componente ------------------
  ngOnInit() {
    this.rutaActiva.params.subscribe(data => {
      if(data['id'] != '0') { //si tiene un id, obtiene los datos de esa persona
        this.getOne(data['id']);
      }
    });
  }

  
  //Método para obtener los datos de una persona --------------------------
  getOne(id: number) {
    this.service.getOne(id).subscribe(data => {
      this.persona = data;
    });
  }

  //Método para guardar los datos -----------------------------------------
  save() {
    this.rutaActiva.params.subscribe(data => {
      this.validate();
      if(data['id'] === '0') { //si es una nueva persona la agrega
        this.add();
      } else {
        this.update(data['id']); //si es una persona existente, la actualiza
      }
    });
  }

  //Método para agregar una nueva persona ---------------------------------
  add() {
    this.service.post(this.persona).subscribe(data => {
      this.persona = data;
      this.router.navigate(['']);
    });
  }

  //Método para actualizar datos ------------------------------------------
  update(id: number) {
    this.service.put(id, this.persona).subscribe(data => {
      this.persona = data;
      this.router.navigate(['']);
    });
  }

  //Método para cancelar --------------------------------------------------
  cancel() {
    this.router.navigate(['']); //redireccionamos a la tabla
  }

  //Método para validar los datos -----------------------------------------
  validate() {
    var nombre, apellido, dni, letras, numeros;

    nombre = (<HTMLInputElement> document.getElementById("nombre")).value.toLowerCase().trim().replace(" ", "");
    apellido = (<HTMLInputElement> document.getElementById("apellido")).value.toLowerCase().trim().replace(" ", "");
    dni = (<HTMLInputElement> document.getElementById("dni")).value.toString().trim().replace(" ", "");

    letras = "abcdefghijklmnñopqrstuvwxyz";
    numeros = "0123456789";

    if(nombre === "" || apellido === "" || dni === "") { //comprobamos que no hayan campos vacíos
      alert('Todos los campos son obligatorios.');
      return false;
    
    } else if(nombre.length > 20) {  //comprobamos que el nombre no sea mayor a 20 caracteres
      alert('El nombre no puede tener más de 20 caracteres.');
      return false;

    } else if(apellido.length > 20) { //comprobamos que el apellido no sea mayor a 20 caracteres
      alert('El apellido no puede tener más de 20 caracteres.');
      return false;
      
    } else if(dni.length > 9 || dni.length < 7) { //comprobamos que el dni tenga entre 7 y 9 caracteres
      alert('Ingrese un DNI válido.');
      return false;
    }

    for(var i = 0; i < nombre.length; i++) {
      if(!(letras.indexOf(nombre.charAt(i),0) != -1)) { //comprobamos que el nombre solo tenga letras
        alert('El nombre solo puede contener letras.');
        return false;
      }
    }

    for(var i = 0; i < apellido.length; i++) {
      if(!(letras.indexOf(apellido.charAt(i),0) != -1)) { //comprobamos que el apellido solo tenga letras
        alert('El apellido solo puede contener letras.');
        return false;
      }
    }

    for(var i = 0; i < dni.length; i++) {
      if(!(numeros.indexOf(dni.charAt(i),0) != -1)) { //comprobamos que el dni solo tenga números
        alert('El DNI solo puede contener números.');
        return false;
      }
    }
  }

}
